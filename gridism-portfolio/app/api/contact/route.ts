import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name    = (body.name    || "").trim();
    const email   = (body.email   || "").trim();
    const company = (body.company || "").trim();
    const social  = (body.social  || "").trim();
    const message = (body.message || "").trim();

    // Validate required fields
    const missing: string[] = [];
    if (!name)    missing.push("name");
    if (!email)   missing.push("email");
    if (!social)  missing.push("social");
    if (!message) missing.push("message");

    if (missing.length > 0) {
      return NextResponse.json(
        { success: false, message: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format." },
        { status: 400 }
      );
    }

    const smtpHost     = process.env.SMTP_HOST;
    const smtpPort     = process.env.SMTP_PORT;
    const smtpEmail    = process.env.SMTP_EMAIL;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const notifyEmail  = process.env.NOTIFY_EMAIL;

    if (!smtpHost || !smtpPort || !smtpEmail || !smtpPassword || !notifyEmail) {
      console.error("SMTP configuration incomplete — check your .env.local");
      return NextResponse.json(
        { success: false, message: "Server configuration error." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort, 10),
      secure: smtpPort === "465",
      auth: { user: smtpEmail, pass: smtpPassword },
    });

    const safeName    = escapeHtml(name);
    const safeEmail   = escapeHtml(email);
    const safeCompany = escapeHtml(company);
    const safeSocial  = escapeHtml(social);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");
    const companyDisplay = safeCompany || `<em style="color:#999;">Not provided</em>`;

    // 1. Owner notification email (dark theme)
    const ownerHTML = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:48px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#111111;border-radius:16px;overflow:hidden;">
        <tr><td style="background:linear-gradient(90deg,#ffffff 0%,#cccccc 100%);height:3px;"></td></tr>
        <tr>
          <td style="padding:48px 48px 32px;text-align:center;">
            <p style="margin:0 0 24px;color:#666666;font-size:11px;letter-spacing:3px;text-transform:uppercase;">Gridism Co</p>
            <h1 style="margin:0 0 12px;color:#ffffff;font-size:28px;font-weight:300;letter-spacing:-0.5px;line-height:1.2;">New Contact Form Submission</h1>
            <p style="margin:0;color:#888888;font-size:15px;font-weight:300;line-height:1.6;">Someone reached out through your Gridism portfolio.</p>
          </td>
        </tr>
        <tr><td style="padding:0 48px;"><div style="height:1px;background-color:#222222;"></div></td></tr>
        <tr>
          <td style="padding:36px 48px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #222222;width:110px;vertical-align:top;"><strong style="color:#888888;font-size:12px;text-transform:uppercase;letter-spacing:0.8px;">Name</strong></td>
                <td style="padding:12px 0 12px 16px;border-bottom:1px solid #222222;color:#ffffff;font-size:15px;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #222222;vertical-align:top;"><strong style="color:#888888;font-size:12px;text-transform:uppercase;letter-spacing:0.8px;">Email</strong></td>
                <td style="padding:12px 0 12px 16px;border-bottom:1px solid #222222;font-size:15px;"><a href="mailto:${safeEmail}" style="color:#ffffff;text-decoration:none;">${safeEmail}</a></td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #222222;vertical-align:top;"><strong style="color:#888888;font-size:12px;text-transform:uppercase;letter-spacing:0.8px;">Company</strong></td>
                <td style="padding:12px 0 12px 16px;border-bottom:1px solid #222222;color:#ffffff;font-size:15px;">${companyDisplay}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #222222;vertical-align:top;"><strong style="color:#888888;font-size:12px;text-transform:uppercase;letter-spacing:0.8px;">Social</strong></td>
                <td style="padding:12px 0 12px 16px;border-bottom:1px solid #222222;color:#ffffff;font-size:15px;">${safeSocial}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;vertical-align:top;"><strong style="color:#888888;font-size:12px;text-transform:uppercase;letter-spacing:0.8px;">Message</strong></td>
                <td style="padding:12px 0 12px 16px;color:#cccccc;font-size:15px;line-height:1.6;">${safeMessage}</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color:#0d0d0d;padding:20px 48px;text-align:center;border-top:1px solid #1a1a1a;">
            <p style="margin:0;color:#444444;font-size:11px;line-height:1.6;">© 2026 Gridism Co · Jakarta, Indonesia<br>Sent from the Gridism Portfolio contact form.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    await transporter.sendMail({
      from: `Gridism <${smtpEmail}>`,
      to: notifyEmail,
      subject: `New Contact Form: ${name}`,
      html: ownerHTML,
    });

    console.log(`Owner notification sent to ${notifyEmail}`);

    // 2. Client thank-you email (dark theme) — non-fatal if it fails
    const clientHTML = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:48px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#111111;border-radius:16px;overflow:hidden;">
        <tr><td style="background:linear-gradient(90deg,#ffffff 0%,#cccccc 100%);height:3px;"></td></tr>
        <tr>
          <td style="padding:48px 48px 32px;text-align:center;">
            <p style="margin:0 0 24px;color:#666666;font-size:11px;letter-spacing:3px;text-transform:uppercase;">Gridism Co</p>
            <h1 style="margin:0 0 12px;color:#ffffff;font-size:36px;font-weight:300;letter-spacing:-0.5px;line-height:1.2;">Thank you, ${safeName}.</h1>
            <p style="margin:0;color:#888888;font-size:16px;font-weight:300;line-height:1.6;">We've received your message and we're excited to connect.</p>
          </td>
        </tr>
        <tr><td style="padding:0 48px;"><div style="height:1px;background-color:#222222;"></div></td></tr>
        <tr>
          <td style="padding:36px 48px;">
            <p style="margin:0 0 20px;color:#aaaaaa;font-size:15px;font-weight:300;line-height:1.8;">Hi ${safeName},</p>
            <p style="margin:0 0 20px;color:#aaaaaa;font-size:15px;font-weight:300;line-height:1.8;">Your message has landed in our inbox. Our team will review your project and get back to you personally usually within <strong style="color:#ffffff;font-weight:500;">1-2 business days</strong>.</p>
            <p style="margin:0 0 32px;color:#aaaaaa;font-size:15px;font-weight:300;line-height:1.8;">In the meantime, feel free to explore our work or follow us on social media to see what we've been building.</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background-color:#1a1a1a;border-left:3px solid #ffffff;border-radius:0 8px 8px 0;padding:20px 24px;">
                  <p style="margin:0 0 6px;color:#666666;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Your message</p>
                  <p style="margin:0;color:#cccccc;font-size:14px;font-weight:300;line-height:1.7;">${safeMessage}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr><td style="padding:0 48px;"><div style="height:1px;background-color:#222222;"></div></td></tr>
        <tr>
          <td style="padding:28px 48px;text-align:center;">
            <p style="margin:0 0 16px;color:#555555;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Find us</p>
            <table align="center" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:0 12px;"><a href="https://instagram.com/gridism.co" style="color:#888888;text-decoration:none;font-size:13px;letter-spacing:1px;">Instagram</a></td>
                <td style="color:#333333;">·</td>
                <td style="padding:0 12px;"><a href="https://id.linkedin.com/company/gridismco" style="color:#888888;text-decoration:none;font-size:13px;letter-spacing:1px;">LinkedIn</a></td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color:#0d0d0d;padding:20px 48px;text-align:center;border-top:1px solid #1a1a1a;">
            <p style="margin:0;color:#444444;font-size:11px;line-height:1.6;">© 2026 Gridism Co · Jakarta, Indonesia<br>You're receiving this because you submitted our contact form.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    try {
      await transporter.sendMail({
        from: `Gridism <${smtpEmail}>`,
        to: email,
        subject: "Thank you for reaching out",
        html: clientHTML,
      });
      console.log(`Thank-you email sent to client: ${email}`);
    } catch (err) {
      console.warn(`WARNING: client thank-you email failed to ${email}:`, err);
    }

    console.log(`✅ Contact form submitted by ${name} (${email})`);
    return NextResponse.json({ success: true, message: "Message sent successfully" });

  } catch (error) {
    console.error("Contact route error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
