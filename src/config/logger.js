import {format, createLogger, transports} from "winston";
const { combine, timestamp, label, prettyPrint } = format;

const CATEGORY = 'log';

export const logger = createLogger({
    level: "debug",
    format: combine(
        label({ label: CATEGORY }),
        timestamp({
            format: "MMM-DD-YYYY HH:mm:ss",
        }),
        prettyPrint()
    ),
    transports: [
        new transports.Console(), 
        new transports.File({
            filename: "logs/logfile.log",
        }),
    ],
});