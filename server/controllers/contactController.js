const nodemailer = require("nodemailer");
const Contact = require("../models/Contact");

// Utility helpers
const escapeHtml = (str = "") =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const nl2br = (s) => String(s).replace(/\n/g, "<br/>");

// Configure reusable transporter once
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT) || 587,
  secure: process.env.MAIL_SECURE === "true",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
});

// Verify transporter on startup
transporter.verify((err, success) => {
  if (err) console.error("Mail transporter failed:", err.message);
  else console.log("Mail transporter ready ✅");
});

exports.submitContact = async (req, res, next) => {
  try {
    const { name, email, number, details } = req.body;
    const ip = req.ip || req.headers["x-forwarded-for"] || null;
    const userAgent = req.get("User-Agent") || null;

    // Save to DB first
    const contact = new Contact({
      name,
      email,
      number,
      details,
      ip,
      userAgent,
    });
    await contact.save();

    // const htmlBody = `
    //   <div style="font-family: Arial, Helvetica, sans-serif; line-height:1.4">
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    //     <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    //     <p><strong>Phone:</strong> ${escapeHtml(number)}</p>
    //     <p><strong>Details:</strong><br/>${nl2br(escapeHtml(details))}</p>
    //     <hr/>
    //     <p><small>Time: ${new Date().toISOString()}</small></p>
    //   </div>
    // `;
    const htmlBody = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, Helvetica, sans-serif;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 40px 0;">
          <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <tr>
              <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
                <h2 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">New Contact Form Submission</h2>
              </td>
            </tr>
            
            <!-- Content -->
            <tr>
              <td style="padding: 40px 30px;">
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  
                  <tr>
                    <td style="padding: 15px 0; border-bottom: 1px solid #e0e0e0;">
                      <p style="margin: 0 0 5px 0; color: #666666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Name</p>
                      <p style="margin: 0; color: #333333; font-size: 16px; font-weight: 500;">${escapeHtml(
                        name
                      )}</p>
                    </td>
                  </tr>
                  
                  <tr>
                    <td style="padding: 15px 0; border-bottom: 1px solid #e0e0e0;">
                      <p style="margin: 0 0 5px 0; color: #666666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Email</p>
                      <p style="margin: 0; color: #333333; font-size: 16px;"><a href="mailto:${escapeHtml(
                        email
                      )}" style="color: #667eea; text-decoration: none;">${escapeHtml(
      email
    )}</a></p>
                    </td>
                  </tr>
                  
                  <tr>
                    <td style="padding: 15px 0; border-bottom: 1px solid #e0e0e0;">
                      <p style="margin: 0 0 5px 0; color: #666666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Phone</p>
                      <p style="margin: 0; color: #333333; font-size: 16px;"><a href="tel:${escapeHtml(
                        number
                      )}" style="color: #667eea; text-decoration: none;">${escapeHtml(
      number
    )}</a></p>
                    </td>
                  </tr>
                  
                  <tr>
                    <td style="padding: 15px 0;">
                      <p style="margin: 0 0 10px 0; color: #666666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
                      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid #667eea;">
                        <p style="margin: 0; color: #333333; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${nl2br(
                          escapeHtml(details)
                        )}</p>
                      </div>
                    </td>
                  </tr>
                  
                </table>
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                <p style="margin: 0; color: #999999; font-size: 13px;">
                  Received on ${new Date().toLocaleString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </td>
            </tr>
            
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`;
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: process.env.CLIENT_MAIL,
      subject: `New Contact from ${name}`,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${number}
Details: ${details}

Time: ${new Date().toISOString()}
      `,
      html: htmlBody,
    };

    // Retry send up to 2 times
    const maxAttempts = 2;
    let attempt = 0;
    let success = false;
    let lastError = null;

    while (attempt < maxAttempts && !success) {
      try {
        attempt++;
        const info = await transporter.sendMail(mailOptions);
        success = true;

        contact.sent = true;
        contact.error = undefined;
        await contact.save();

        return res.status(201).json({
          success: true,
          message: "Message sent successfully",
          info,
        });
      } catch (err) {
        lastError = err;
        console.warn(`Attempt ${attempt} failed:`, err.message);
        await new Promise((r) => setTimeout(r, 500 * attempt));
      }
    }

    // If all attempts failed
    contact.sent = false;
    contact.error = lastError?.message || "Unknown error";
    await contact.save();

    return res.status(502).json({
      success: false,
      message: "Failed to send email",
      error: contact.error,
    });
  } catch (err) {
    next(err);
  }
};
