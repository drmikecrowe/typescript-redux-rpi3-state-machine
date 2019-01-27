import debug from "debug";
const dbg: debug.Debugger = debug("vips:desktop:index");

import store from "@src/store";

import * as keypress from "keypress";
import { fireDoOpen, fireDoClose } from "@src/store/app/fsm";
import { IHardwareInterface } from "@src/store/app/hardware/hardwareInterface";

export class DesktopInterface implements IHardwareInterface {
    constructor() {
        dbg(`Starting desktop keyboard listenener`);

        // make `process.stdin` begin emitting "keypress" events
        keypress(process.stdin);

        // listen for the "keypress" event
        process.stdin.on("keypress", (ch, key) => {
            if (!key) {
                return;
            }
            // debug('got "keypress"', ch, key, key.name);
            switch (key.name) {
                case "q":
                    process.exit(0);
                case "o":
                    store.dispatch(fireDoOpen());
                    break;
                case "c":
                    store.dispatch(fireDoClose());
                    break;
            }
        });

        process.stdin.resume();
        if (!process.stdin.setRawMode) {
            setTimeout(() => {
                store.dispatch(fireDoOpen());
            }, 1000);
        }
    }
}
