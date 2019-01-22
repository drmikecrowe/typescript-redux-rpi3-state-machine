// prettier-ignore
const debug = require("debug")("fsm:" + __filename.replace(/^.*(src)/, "$1").replace(/.[jt]s}/, "").replace(/\//g, ":"));

import * as keypress from "keypress";
import { fireDoOpen, fireDoClose } from "../../../fsm";
import store from "../../../..";

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

// listen for the "keypress" event
process.stdin.on("keypress", function(ch, key) {
    debug('got "keypress"', key.name);
    if (!key) return;
    if (key.name == "q") {
        process.exit(0);
    }
    switch (key.name) {
        case "o":
            store.dispatch(fireDoOpen());
            break;
        case "c":
            store.dispatch(fireDoClose());
            break;
    }
});

if (!process.stdin.setRawMode) {
    setTimeout(() => {
        store.dispatch(fireDoOpen())
        setTimeout(() => {
            store.dispatch(fireDoClose());
            setTimeout(() => {
                process.exit(0);
            }, 1000);
        }, 1000);
    }, 1000);
}

process.stdin.resume();
