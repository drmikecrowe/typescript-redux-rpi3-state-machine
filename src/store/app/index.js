"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const redux_1 = require("redux");
// Application relevant
const fsm_1 = require("./fsm");
const hardware_1 = require("./hardware");
__export(require("./fsm"));
__export(require("./hardware"));
exports.appSagas = _.concat(fsm_1.fsmSagas, hardware_1.hardwareSagas);
exports.appReducer = redux_1.combineReducers({
    fsm: fsm_1.fsmStateReducer,
    hardware: hardware_1.hardwareReducer
});
//# sourceMappingURL=index.js.map