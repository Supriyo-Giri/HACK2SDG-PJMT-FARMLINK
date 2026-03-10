import winston from "winston"
import "winston-daily-rotate-file"

const { combine, timestamp, json, printf, colorize, errors } = winston.format;

// 1. Define custom format for local development (Human Readable)
const devFormat = combine(
  colorize(),
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  errors({ stack: true }), // Capture stack traces
  printf(({ timestamp, level, message, stack }) => {
    return `[${timestamp}] ${level}: ${stack || message}`;
  })
);

// 2. Define transport for log rotation (Production Files)
const fileRotateTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/app-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,    // Compress old logs
  maxSize: '20m',         // Rotate if file exceeds 20MB
  maxFiles: '14d',        // Keep logs for 14 days
  level: 'info',
  format: combine(timestamp(), json()) // Production uses JSON
});

// 3. Create the Logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  defaultMeta: { service: 'user-service' }, // Add context to every log
  transports: [
    fileRotateTransport,
    // Error-specific logs for easier debugging
    new winston.transports.DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      level: 'error',
      maxFiles: '30d'
    })
  ]
});

// 4. If not in production, also log to the console with pretty colors
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: devFormat
  }));
}

export default logger;