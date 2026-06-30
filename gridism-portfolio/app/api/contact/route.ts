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

    // 1. Owner notification email
    const ownerHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Switzer:wght@300;400;500;600&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background-color:#F9F9F7;font-family:'Switzer',Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F9F9F7;padding:48px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#F9F9F7;border:1px solid #000000;border-radius:0;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background-color:#060606;padding:14px 24px;">
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <img src="https://gridism.co/images/GRD%20WHITE%20TM.png" alt="Gridism" height="22" style="display:block;" />
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Intro -->
        <tr>
          <td style="padding:40px 32px 24px;font-family:'Switzer',Arial,Helvetica,sans-serif;">
            <h1 style="margin:0 0 8px;color:#000000;font-size:26px;font-weight:300;line-height:1.2;font-family:'Switzer',Arial,Helvetica,sans-serif;">Someone reached out.</h1>
            <p style="margin:0;color:#555555;font-size:14px;line-height:1.6;font-family:'Switzer',Arial,Helvetica,sans-serif;">A new message was submitted through the Gridism portfolio contact form.</p>
          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="padding:0 32px;"><div style="height:1px;background-color:#000000;"></div></td></tr>

        <!-- Fields -->
        <tr>
          <td style="padding:24px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #dddddd;width:100px;vertical-align:top;">
                  <strong style="color:#000000;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-family:'Switzer',Arial,Helvetica,sans-serif;">Name</strong>
                </td>
                <td style="padding:10px 0 10px 16px;border-bottom:1px solid #dddddd;color:#000000;font-size:14px;font-family:'Switzer',Arial,Helvetica,sans-serif;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #dddddd;vertical-align:top;">
                  <strong style="color:#000000;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-family:'Switzer',Arial,Helvetica,sans-serif;">Email</strong>
                </td>
                <td style="padding:10px 0 10px 16px;border-bottom:1px solid #dddddd;font-size:14px;font-family:'Switzer',Arial,Helvetica,sans-serif;">
                  <a href="mailto:${safeEmail}" style="color:#000000;text-decoration:underline;font-family:'Switzer',Arial,Helvetica,sans-serif;">${safeEmail}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #dddddd;vertical-align:top;">
                  <strong style="color:#000000;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-family:'Switzer',Arial,Helvetica,sans-serif;">Company</strong>
                </td>
                <td style="padding:10px 0 10px 16px;border-bottom:1px solid #dddddd;color:#000000;font-size:14px;font-family:'Switzer',Arial,Helvetica,sans-serif;">${companyDisplay}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #dddddd;vertical-align:top;">
                  <strong style="color:#000000;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-family:'Switzer',Arial,Helvetica,sans-serif;">Social</strong>
                </td>
                <td style="padding:10px 0 10px 16px;border-bottom:1px solid #dddddd;color:#000000;font-size:14px;font-family:'Switzer',Arial,Helvetica,sans-serif;">${safeSocial}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;vertical-align:top;">
                  <strong style="color:#000000;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-family:'Switzer',Arial,Helvetica,sans-serif;">Message</strong>
                </td>
                <td style="padding:10px 0 10px 16px;color:#000000;font-size:14px;line-height:1.7;font-family:'Switzer',Arial,Helvetica,sans-serif;">${safeMessage}</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="padding:0 32px;"><div style="height:1px;background-color:#000000;"></div></td></tr>

        <!-- Footer -->
        <tr>
          <td style="padding:16px 32px;text-align:center;">
            <p style="margin:0;color:#888888;font-size:11px;line-height:1.6;font-family:'Switzer',Arial,Helvetica,sans-serif;">© 2026 Gridism.co · Jakarta, Indonesia<br>Sent from the Gridism Portfolio contact form.</p>
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

    // 2. Client thank-you email — non-fatal if it fails
    const clientHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Switzer:wght@300;400;500;600&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background-color:#F9F9F7;font-family:'Switzer',Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F9F9F7;padding:48px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#F9F9F7;border:1px solid #000000;border-radius:0;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background-color:#060606;padding:14px 24px;">
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <img src="https://gridism.co/images/GRD%20WHITE%20TM.png" alt="Gridism" height="22" style="display:block;" />
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Intro -->
        <tr>
          <td style="padding:40px 32px 24px;font-family:'Switzer',Arial,Helvetica,sans-serif;">
            <h1 style="margin:0 0 8px;color:#000000;font-size:26px;font-weight:300;line-height:1.2;font-family:'Switzer',Arial,Helvetica,sans-serif;">Thank you, ${safeName}.</h1>
            <p style="margin:0;color:#555555;font-size:14px;line-height:1.6;font-family:'Switzer',Arial,Helvetica,sans-serif;">We've received your message and we're excited to connect.</p>
          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="padding:0 32px;"><div style="height:1px;background-color:#000000;"></div></td></tr>

        <!-- Body -->
        <tr>
          <td style="padding:28px 32px;font-family:'Switzer',Arial,Helvetica,sans-serif;">
            <p style="margin:0 0 16px;color:#000000;font-size:14px;line-height:1.8;font-family:'Switzer',Arial,Helvetica,sans-serif;">Hi ${safeName},</p>
            <p style="margin:0 0 16px;color:#000000;font-size:14px;line-height:1.8;font-family:'Switzer',Arial,Helvetica,sans-serif;">Your message has landed in our inbox. Our team will review your project and get back to you personally usually within <strong style="color:#000000;font-weight:600;font-family:'Switzer',Arial,Helvetica,sans-serif;">1-2 business days</strong>.</p>
            <p style="margin:0 0 28px;color:#000000;font-size:14px;line-height:1.8;font-family:'Switzer',Arial,Helvetica,sans-serif;">In the meantime, feel free to explore our work or follow us on social media to see what we've been building.</p>

            <!-- Message recap -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background-color:#efefed;border-left:3px solid #000000;border-radius:0;padding:16px 20px;">
                  <p style="margin:0 0 6px;color:#555555;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-family:'Switzer',Arial,Helvetica,sans-serif;">Your message</p>
                  <p style="margin:0;color:#000000;font-size:14px;line-height:1.7;font-family:'Switzer',Arial,Helvetica,sans-serif;">${safeMessage}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="padding:0 32px;"><div style="height:1px;background-color:#000000;"></div></td></tr>

        <!-- Social -->
        <tr>
          <td style="padding:20px 32px;text-align:center;">
            <p style="margin:0 0 12px;color:#555555;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-family:'Switzer',Arial,Helvetica,sans-serif;">Find us</p>
            <table align="center" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:0 12px;"><a href="https://instagram.com/gridism.co" style="color:#000000;text-decoration:underline;font-size:13px;font-family:'Switzer',Arial,Helvetica,sans-serif;">Instagram</a></td>
                <td style="color:#aaaaaa;font-family:'Switzer',Arial,Helvetica,sans-serif;">·</td>
                <td style="padding:0 12px;"><a href="https://id.linkedin.com/company/gridismco" style="color:#000000;text-decoration:underline;font-size:13px;font-family:'Switzer',Arial,Helvetica,sans-serif;">LinkedIn</a></td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="padding:0 32px;"><div style="height:1px;background-color:#000000;"></div></td></tr>

        <!-- Footer -->
        <tr>
          <td style="padding:16px 32px;text-align:center;">
            <p style="margin:0;color:#888888;font-size:11px;line-height:1.6;font-family:'Switzer',Arial,Helvetica,sans-serif;">© 2026 Gridism.co · Jakarta, Indonesia<br>You're receiving this because you submitted our contact form.</p>
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
