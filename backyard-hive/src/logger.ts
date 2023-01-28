import { addColors, format, createLogger, transports } from "winston";
import path from "path";

const loggedAtFile = path.basename(process.mainModule.filename);
const timestampFormat = "DD-MMM-YY HH:mm:ss A";

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const level = () => {
    const env = process.env.NODE_ENV || "development";
    const isDevelopment = env === "development";
    return isDevelopment ? "debug" : "warn";
};

const colors = {
    error: "bold red",
    warn: "yellow",
    info: "blue",
    http: "magenta",
    debug: "bold violet",
};

addColors(colors);

const consoleFormat = format.combine(
    format.colorize({ all: true }),
    format.timestamp({ format: timestampFormat }),
    format.align(),
    format.splat(),
    format.json(),
    format.label({ label: loggedAtFile }),
    format.printf(({ timestamp, label, level, message, metadata }) => {
        return `[${timestamp}] - [${label}] | ${level}:${message} ${JSON.stringify(metadata, null, 2) || ""}`;
    }),
);

const Logger = createLogger({
    level: level(),
    levels,
    transports: [
        new transports.File({
            filename: path.join(__dirname, "../logs/error.log"),
            level: "error",
            handleExceptions: true,
            handleRejections: true,
        }),
        new transports.File({
            filename: path.join(__dirname, "../logs/activity.log"),
            maxsize: 5242880, //5MB
            maxFiles: 5, // just in case
        }),
    ],
    exitOnError: false,
});

if (process.env.NODE_ENV !== "production") {
    Logger.add(
        new transports.Console({
            level: level(),
            format: consoleFormat,
        }),
    );
}

export default Logger;
