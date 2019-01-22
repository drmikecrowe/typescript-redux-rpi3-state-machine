// prettier-ignore
const debug = require("debug")("fsm:" + __filename.replace(/^.*(src)/, "$1").replace(/.[jt]s}/, "").replace(/\//g, ":"));

import { isWin, PayloadAction } from "../..";

if (isWin) {
    require("./platform/desktop");
} else {
    require("./platform/rpi");
}

export * from "./hardwareSagas";

export interface HardwareState {}

export let initialHardwareState: HardwareState = {};

export const OPEN_DOOR = "OPEN_DOOR";
export let openDoor = () => ({ type: OPEN_DOOR });

export const CLOSE_DOOR = "CLOSE_DOOR";
export let closeDoor = () => ({ type: CLOSE_DOOR });

export let hardwareReducer = (state = initialHardwareState, { type, payload }: PayloadAction<any>): HardwareState => {
    switch (type) {
        default:
            return state;
    }
};
