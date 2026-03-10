import logger from "../utils/logger.js";

const requestLogger = (req, res, next) => {
  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const end = process.hrtime.bigint();
    const duration = Number(end - start) / 1_000_000;

    // Status-based log level
    let level = "info";
    if (res.statusCode >= 500) level = "error";
    else if (res.statusCode >= 400) level = "warn";

    logger.log({
      level,
      message: `${req.method} ${req.originalUrl}`,
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      responseTime: `${duration.toFixed(2)} ms`,
      ip: req.ip
    });
  });

  next();
};

export default requestLogger;