"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// prettier-ignore
const debug = require("debug")("fsm:" + __filename.replace(/^.*(src)/, "$1").replace(/.[jt]s}/, "").replace(/\//g, ":"));
const __1 = require("../..");
if (__1.isWin) {
    require("./platform/desktop");
}
else {
    require("./platform/rpi");
}
__export(require("./hardwareSagas"));
exports.initialHardwareState = {};
exports.OPEN_DOOR = "OPEN_DOOR";
exports.openDoor = () => ({ type: exports.OPEN_DOOR });
exports.CLOSE_DOOR = "CLOSE_DOOR";
exports.closeDoor = () => ({ type: exports.CLOSE_DOOR });
exports.hardwareReducer = (state = exports.initialHardwareState, { type, payload }) => {
    switch (type) {
        default:
            return state;
    }
};
//# sourceMappingURL=index.js.map