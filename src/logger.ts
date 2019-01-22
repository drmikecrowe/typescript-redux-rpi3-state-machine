const winston = require("winston");
import * as path from "path";
import * as fs from "fs";
import * as _ from "lodash";

let isWin = process.platform === "win32" || process.platform === "linux";
let debug = true; //(process.env.DEBUG > '');

let t = [];
if (debug) {
    t.push(
        new winston.transports.Console({
            prettyPrint: true,
            json: false,
            level: "debug",
            colorize: true
        })
    );
}
if (isWin) {
    let cwd = process.cwd();
    let logs = path.join(cwd, "logs");
    if (!fs.existsSync(logs)) {
        fs.mkdirSync(logs);
    }
    let log_file = path.join(logs, "simulator.log");
    t.push(
        new winston.transports.File({
            filename: log_file,
            prettyPrint: true,
            level: debug ? "debug" : "info",
            json: false,
            tailable: true,
            maxsize: "1M",
            maxFiles: 5,
            timestamp: true
        })
    );
}

export const Log = winston.createLogger({
    level: debug ? "debug" : "info",
    transports: t
});
