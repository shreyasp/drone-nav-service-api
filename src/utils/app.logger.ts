/**
 * Required External Modules
 */
import { createLogger, LoggerOptions, format, transports } from "winston";
import dotenv from "dotenv";

/**
 * Configuration
 */
dotenv.config();

const LOGGER_CONFIG_PROD: LoggerOptions = {
    level: "info",
    format: format.json(),
    transports: [
        new transports.File({
            filename: "error.log",
            level: "error",
        }),
        new transports.File({
            filename: "combined-access.log",
        }),
    ],
};

const LOGGER_CONFIG_DEV: LoggerOptions = {
    level: "info",
    transports: [
        new transports.Console({
            format: format.simple(),
        }),
    ],
};

/**
 * logger Definition
 */
const config =
    process.env.NODE_ENV === "development"
        ? LOGGER_CONFIG_DEV
        : LOGGER_CONFIG_PROD;
const logger = createLogger(config);

export { logger as appLogger };
