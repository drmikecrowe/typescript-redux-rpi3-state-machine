import * as path from "path";
import * as fs from "fs";
import * as _ from "lodash";

import { createLogger, format, transports, Logger } from "winston";

import { isWin } from "./store";

export class LoggerFactory {
    private static instance: Logger;
    static getInstance() {
        if (!LoggerFactory.instance) {
            const env = process.env.NODE_ENV || "development";
            const cwd = process.cwd();
            const logs = path.join(cwd, "logs");
            if (!fs.existsSync(logs)) {
                fs.mkdirSync(logs);
            }
            const log_file = path.join(logs, "simulator.log");
            const level = env === "development" ? "debug" : "info";

            LoggerFactory.instance = createLogger({
                level: level,
                format: format.combine(
                    format.timestamp({
                        format: "YYYY-MM-DD HH:mm:ss",
                    }),
                    format.json(),
                ),
                transports: [
                    new transports.Console({
                        level: "info",
                        format: format.combine(format.colorize(), format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)),
                    }),
                    new transports.File({ filename: log_file }),
                ],
            });
        }
        return LoggerFactory.instance;
    }
}
