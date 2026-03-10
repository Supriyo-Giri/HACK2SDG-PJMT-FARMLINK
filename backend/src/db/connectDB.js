import mongoose from "mongoose"
import logger from "../utils/logger.js"
import { ENV } from "../utils/env.js"

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV.MONGO_URI);
        logger.info(`Connected to database successfully: ${conn.connection.host}`);
    } catch (error) {
        logger.error(`Error in connecting to database: ${error}`)
    }
}