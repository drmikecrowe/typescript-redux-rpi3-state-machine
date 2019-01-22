"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// prettier-ignore
const debug = require("debug")("fsm:" + __filename.replace(/^.*(src)/, "$1").replace(/.[jt]s}/, "").replace(/\//g, ":"));
const keypress = require("keypress");
const fsm_1 = require("../../../fsm");
const __1 = require("../../../..");
// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);
// listen for the "keypress" event
process.stdin.on("keypress", function (ch, key) {
    debug('got "keypress"', key.name);
    if (!key)
        return;
    if (key.ctrl && key.name == "q") {
        process.exit(0);
    }
    switch (key.name) {
        case "o":
            __1.default.dispatch(fsm_1.fireDoOpen());
            break;
        case "c":
            __1.default.dispatch(fsm_1.fireDoClose());
            break;
    }
});
if (!process.stdin.setRawMode) {
    setTimeout(() => {
        __1.default.dispatch(fsm_1.fireDoOpen());
        setTimeout(() => {
            __1.default.dispatch(fsm_1.fireDoClose());
            setTimeout(() => {
                process.exit(0);
            }, 1000);
        }, 1000);
    }, 1000);
}
process.stdin.resume();
//# sourceMappingURL=index.js.map