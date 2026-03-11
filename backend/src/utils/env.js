import dotenv from "dotenv"
dotenv.config();

export const ENV = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    CLIENT_URL: process.env.CLIENT_URL,
    // MAIL_USER: process.env.MAIL_USER,
    // MAIL_PASSWORD: process.env.MAIL_PASSWORD,

    RESEND_API_KEY: process.env.RESEND_API_KEY
}
