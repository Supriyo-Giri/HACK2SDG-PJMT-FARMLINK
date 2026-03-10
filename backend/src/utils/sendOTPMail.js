import nodemailer from "nodemailer";
import { ENV } from "./env.js";
import logger from "./logger.js";

export const sendOTPMail = async(name, email, otp) => {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: ENV.MAIL_USER,
      pass: ENV.MAIL_PASSWORD,
    },
  });

  const mailConfiguration = {
    // from: ENV.MAIL_USER,
    from: `"FarmLink Team" <${ENV.MAIL_USER}>`,
    to: email,
    subject: "Password reset OTP from E-store",
    // text: `Hello ${name},
    //     Thank you for registering with us. Your One Time Password(OTP) for forgot Password is below:
    //     ${otp}
    //     If this is not you, please ignore this email.

    //     Best regards,
    //     Team E-store `,
    html: `<body style="margin:0; padding:0; background-color:#f4f6f9; font-family:Arial, sans-serif;">

        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center" style="padding:40px 20px;">
              
              <!-- Main Container -->
              <table width="100%" max-width="500" cellpadding="0" cellspacing="0" border="0" 
                style="background:#ffffff; border-radius:8px; padding:30px; box-shadow:0 4px 12px rgba(0,0,0,0.1);">

                <tr>
                  <td align="center">
                    <h2 style="color:#2c3e50; margin-bottom:10px;">Reset Your Password</h2>
                    <p style="color:#555; font-size:14px;">
                      Hello ${name}, We received a request to reset your password.
                      Use the OTP below to proceed.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td align="center" style="padding:25px 0;">
                    <div style="font-size:28px; letter-spacing:6px; font-weight:bold; color:#3498db;">
                      ${otp}
                    </div>
                  </td>
                </tr>

                <tr>
                  <td align="center">
                    <p style="font-size:13px; color:#777;">
                      This OTP is valid for <strong>10 minutes</strong>.
                      If you did not request a password reset, please ignore this email.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td align="center" style="padding-top:20px;">
                    <p style="font-size:12px; color:#aaa;">
                      © 2026 E-store. All rights reserved.
                    </p>
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>
    </body>`,
  };
  mailTransporter.sendMail(mailConfiguration, function (err, data) {
    if (err) {
      logger.error(`Error in sending otp for forgot password email: ${err.message}`);
      process.exit(1);
    } else {
      logger.info(`OTP for forgot Password sent to email successfully`);
    }
  });
};
