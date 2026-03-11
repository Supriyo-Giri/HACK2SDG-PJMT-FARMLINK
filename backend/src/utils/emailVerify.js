// import nodemailer from "nodemailer";
// import { ENV } from "./env.js";
// import logger from "./logger.js";

// export const verifyEmail = (name, email, token) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: ENV.MAIL_USER,
//       pass: ENV.MAIL_PASSWORD,
//     },
//   });

//   const verificationLink = `${ENV.CLIENT_URL}/verify/${token}`;

//   const mailConfiguration = {
//     from: `"FarmLink Team" <${ENV.MAIL_USER}>`,
//     to: email,
//     subject: "🌱 Verify Your Email – Welcome to FarmLink",
//     text: `
// Hello ${name},

// Welcome to FarmLink! 🌾

// We're excited to have you join our platform that connects farmers and vendors directly without middlemen.

// To activate your account, please verify your email by clicking the link below:

// ${verificationLink}

// ⏳ This verification link will expire in 15 minutes.

// If you did not create this account, you can safely ignore this email.

// Thank you for being a part of FarmLink and helping build a better marketplace for farmers and vendors.

// Warm regards,  
// Team FarmLink
//     `,
//   };

//   transporter.sendMail(mailConfiguration, function (err, data) {
//     if (err) {
//       logger.error(`Error sending verification email: ${err.message}`);
//       return;
//     } else {
//       logger.info(`Verification email sent successfully to ${email}`);
//     }
//   });
// };



import { Resend } from "resend";
import { ENV } from "./env.js";
import logger from "./logger.js";

const resend = new Resend(ENV.RESEND_API_KEY);

export const verifyEmail = async (name, email, token) => {
  try {
    const verificationLink = `${ENV.CLIENT_URL}/verify/${token}`;

    await resend.emails.send({
      from: "FarmLink Team <onboarding@resend.dev>", 
      to: email,
      subject: "🌱 Verify Your Email – Welcome to FarmLink",
      text: `
Hello ${name},

Welcome to FarmLink! 🌾

We're excited to have you join our platform that connects farmers and vendors directly without middlemen.

To activate your account, please verify your email by clicking the link below:

${verificationLink}

⏳ This verification link will expire in 15 minutes.

If you did not create this account, you can safely ignore this email.

Thank you for being a part of FarmLink and helping build a better marketplace for farmers and vendors.

Warm regards,
Team FarmLink
      `,
    });

    logger.info(`Verification email sent successfully to ${email}`);
  } catch (err) {
    logger.error(`Error sending verification email: ${err.message}`);
  }
};