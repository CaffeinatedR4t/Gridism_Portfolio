package services

import (
	"fmt"
	"html"
	"log"
	"net/smtp"
	"os"
	"strings"

	"gridism-backend/models"
)

// sendMail is a helper that authenticates and sends a single HTML email.
func sendMail(smtpHost, smtpPort, smtpEmail, smtpPassword, from, to, subject, htmlBody string) error {
	mime := "MIME-version: 1.0;\r\nContent-Type: text/html; charset=\"UTF-8\";\r\n"
	msg := []byte(
		"From: Gridism <" + from + ">\r\n" +
			"To: " + to + "\r\n" +
			"Subject: " + subject + "\r\n" +
			mime + "\r\n" +
			htmlBody,
	)
	auth := smtp.PlainAuth("", smtpEmail, smtpPassword, smtpHost)
	return smtp.SendMail(smtpHost+":"+smtpPort, auth, smtpEmail, []string{to}, msg)
}

// SendContactEmail sends:
//  1. A notification email to the site owner (NOTIFY_EMAIL)
//  2. A thank-you confirmation email to the client who submitted the form
func SendContactEmail(form models.ContactForm) error {
	smtpHost := os.Getenv("SMTP_HOST")
	smtpPort := os.Getenv("SMTP_PORT")
	smtpEmail := os.Getenv("SMTP_EMAIL")
	smtpPassword := os.Getenv("SMTP_PASSWORD")
	notifyEmail := os.Getenv("NOTIFY_EMAIL")

	// Validate SMTP configuration
	if smtpHost == "" || smtpPort == "" || smtpEmail == "" || smtpPassword == "" || notifyEmail == "" {
		return fmt.Errorf("SMTP configuration is incomplete - check your .env file")
	}

	// Escape user input for safe HTML rendering
	safeName := html.EscapeString(form.Name)
	safeEmail := html.EscapeString(form.Email)
	safeCompany := html.EscapeString(form.Company)
	safeSocial := html.EscapeString(form.Social)
	safeMessage := strings.ReplaceAll(html.EscapeString(form.Message), "\n", "<br>")

	companyDisplay := safeCompany
	if companyDisplay == "" {
		companyDisplay = `<em style="color:#999;">Not provided</em>`
	}

	// 1. Owner notification email (Dark Theme)
	ownerHTML := fmt.Sprintf(`<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table width="100%%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:48px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#111111;border-radius:16px;overflow:hidden;">
        <!-- Top accent bar -->
        <tr>
          <td style="background:linear-gradient(90deg,#ffffff 0%%,#cccccc 100%%);height:3px;"></td>
        </tr>
        <!-- Header -->
        <tr>
          <td style="padding:48px 48px 32px;text-align:center;">
            <p style="margin:0 0 24px;color:#666666;font-size:11px;letter-spacing:3px;text-transform:uppercase;">Gridism Co</p>
            <h1 style="margin:0 0 12px;color:#ffffff;font-size:28px;font-weight:300;letter-spacing:-0.5px;line-height:1.2;">
              New Contact Form Submission
            </h1>
            <p style="margin:0;color:#888888;font-size:15px;font-weight:300;line-height:1.6;">
              Someone reached out through your Gridism portfolio.
            </p>
          </td>
        </tr>
        <!-- Divider -->
        <tr>
          <td style="padding:0 48px;">
            <div style="height:1px;background-color:#222222;"></div>
          </td>
        </tr>
        <!-- Body copy -->
        <tr>
          <td style="padding:36px 48px;">
            <table width="100%%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #222222;width:110px;vertical-align:top;">
                  <strong style="color:#888888;font-size:12px;text-transform:uppercase;letter-spacing:0.8px;">Name</strong>
                </td>
                <td style="padding:12px 0 12px 16px;border-bottom:1px solid #222222;color:#ffffff;font-size:15px;">%s</td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #222222;vertical-align:top;">
                  <strong style="color:#888888;font-size:12px;text-transform:uppercase;letter-spacing:0.8px;">Email</strong>
                </td>
                <td style="padding:12px 0 12px 16px;border-bottom:1px solid #222222;font-size:15px;">
                  <a href="mailto:%s" style="color:#ffffff;text-decoration:none;">%s</a>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #222222;vertical-align:top;">
                  <strong style="color:#888888;font-size:12px;text-transform:uppercase;letter-spacing:0.8px;">Company</strong>
                </td>
                <td style="padding:12px 0 12px 16px;border-bottom:1px solid #222222;color:#ffffff;font-size:15px;">%s</td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #222222;vertical-align:top;">
                  <strong style="color:#888888;font-size:12px;text-transform:uppercase;letter-spacing:0.8px;">Social</strong>
                </td>
                <td style="padding:12px 0 12px 16px;border-bottom:1px solid #222222;color:#ffffff;font-size:15px;">%s</td>
              </tr>
              <tr>
                <td style="padding:12px 0;vertical-align:top;">
                  <strong style="color:#888888;font-size:12px;text-transform:uppercase;letter-spacing:0.8px;">Message</strong>
                </td>
                <td style="padding:12px 0 12px 16px;color:#cccccc;font-size:15px;line-height:1.6;">%s</td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background-color:#0d0d0d;padding:20px 48px;text-align:center;border-top:1px solid #1a1a1a;">
            <p style="margin:0;color:#444444;font-size:11px;line-height:1.6;">
              © 2026 Gridism Co · Jakarta, Indonesia<br>
              Sent from the Gridism Portfolio contact form.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`, safeName, safeEmail, safeEmail, companyDisplay, safeSocial, safeMessage)

	if err := sendMail(smtpHost, smtpPort, smtpEmail, smtpPassword,
		smtpEmail, notifyEmail,
		fmt.Sprintf("New Contact Form: %s", form.Name),
		ownerHTML,
	); err != nil {
		return fmt.Errorf("owner notification failed: %w", err)
	}
	log.Printf("Owner notification sent to %s", notifyEmail)

	// 2. Client thank-you email (Dark Theme)
	clientHTML := fmt.Sprintf(`<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table width="100%%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:48px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#111111;border-radius:16px;overflow:hidden;">

        <!-- Top accent bar -->
        <tr>
          <td style="background:linear-gradient(90deg,#ffffff 0%%,#cccccc 100%%);height:3px;"></td>
        </tr>

        <!-- Header -->
        <tr>
          <td style="padding:48px 48px 32px;text-align:center;">
            <p style="margin:0 0 24px;color:#666666;font-size:11px;letter-spacing:3px;text-transform:uppercase;">Gridism Co</p>
            <h1 style="margin:0 0 12px;color:#ffffff;font-size:36px;font-weight:300;letter-spacing:-0.5px;line-height:1.2;">
              Thank you, %s.
            </h1>
            <p style="margin:0;color:#888888;font-size:16px;font-weight:300;line-height:1.6;">
              We've received your message and we're excited to connect.
            </p>
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="padding:0 48px;">
            <div style="height:1px;background-color:#222222;"></div>
          </td>
        </tr>

        <!-- Body copy -->
        <tr>
          <td style="padding:36px 48px;">
            <p style="margin:0 0 20px;color:#aaaaaa;font-size:15px;font-weight:300;line-height:1.8;">
              Hi %s,
            </p>
            <p style="margin:0 0 20px;color:#aaaaaa;font-size:15px;font-weight:300;line-height:1.8;">
              Your message has landed in our inbox. Our team will review your project and get back to you personally usually within <strong style="color:#ffffff;font-weight:500;">1-2 business days</strong>.
            </p>
            <p style="margin:0 0 32px;color:#aaaaaa;font-size:15px;font-weight:300;line-height:1.8;">
              In the meantime, feel free to explore our work or follow us on social media to see what we've been building.
            </p>

            <!-- Message recap box -->
            <table width="100%%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background-color:#1a1a1a;border-left:3px solid #ffffff;border-radius:0 8px 8px 0;padding:20px 24px;">
                  <p style="margin:0 0 6px;color:#666666;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Your message</p>
                  <p style="margin:0;color:#cccccc;font-size:14px;font-weight:300;line-height:1.7;">%s</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="padding:0 48px;">
            <div style="height:1px;background-color:#222222;"></div>
          </td>
        </tr>

        <!-- Social links -->
        <tr>
          <td style="padding:28px 48px;text-align:center;">
            <p style="margin:0 0 16px;color:#555555;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Find us</p>
            <table align="center" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:0 12px;">
                  <a href="https://instagram.com/gridism.co" style="color:#888888;text-decoration:none;font-size:13px;letter-spacing:1px;">Instagram</a>
                </td>
                <td style="color:#333333;">·</td>
                <td style="padding:0 12px;">
                  <a href="https://id.linkedin.com/company/gridismco" style="color:#888888;text-decoration:none;font-size:13px;letter-spacing:1px;">LinkedIn</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color:#0d0d0d;padding:20px 48px;text-align:center;border-top:1px solid #1a1a1a;">
            <p style="margin:0;color:#444444;font-size:11px;line-height:1.6;">
              © 2026 Gridism Co · Jakarta, Indonesia<br>
              You're receiving this because you submitted our contact form.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`, safeName, safeName, safeMessage)

	if err := sendMail(smtpHost, smtpPort, smtpEmail, smtpPassword,
		smtpEmail, form.Email,
		"Thank you for reaching out",
		clientHTML,
	); err != nil {
		// Non-fatal: owner was already notified, log but don't fail the request
		log.Printf("WARNING: client thank-you email failed to %s: %v", form.Email, err)
	} else {
		log.Printf("Thank-you email sent to client: %s", form.Email)
	}

	return nil
}
