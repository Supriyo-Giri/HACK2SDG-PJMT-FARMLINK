import jwt from "jsonwebtoken"
import { ENV } from "./env.js"
import logger from "./logger.js";

export const generateEmailVerificationToken = (user) =>{
    try {
        const token = jwt.sign({ id:user._id }, ENV.JWT_SECRET,{expiresIn: '15m' });
        return token;
    } catch (error) {
        logger.error(`Error in generating token for email verfication: ${error.message}`);
    }
}