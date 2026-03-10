import { ENV } from "./src/utils/env.js"
import app from "./src/app.js"
import logger from "./src/utils/logger.js"
import { connectDB } from "./src/db/connectDB.js"

app.listen(ENV.PORT,()=>{
    connectDB();
    logger.info(`Server started on port: ${ENV.PORT}`);
})