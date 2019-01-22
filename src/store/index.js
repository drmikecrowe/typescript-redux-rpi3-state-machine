"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// prettier-ignore
const debug = require("debug")("fsm:" + __filename.replace(/^.*(src)/, "$1").replace(/.[jt]s}/, "").replace(/\//g, ":"));
exports.isWin = process.platform === "win32" || process.platform === "linux";
const redux_1 = require("redux");
const effects_1 = require("redux-saga/effects");
const app_1 = require("./app");
const redux_saga_1 = require("redux-saga");
__export(require("./app"));
__export(require("./constants"));
var logger_1 = require("../logger");
exports.Log = logger_1.Log;
exports.reducers = redux_1.combineReducers({
    app: app_1.appReducer,
});
exports.loadSagas = (sagas, newSagas) => {
    newSagas
        .map(saga => function* main() {
        const task = yield effects_1.fork(saga);
        const { done, canceled } = yield effects_1.race({
            done: effects_1.join(task),
            canceled: effects_1.take("CANCEL_SAGAS"),
        });
        if (canceled)
            yield effects_1.cancel(task);
    })
        .forEach(saga => sagas.run(saga));
};
exports.cancelSagas = (store) => store.dispatch({ type: "CANCEL_SAGAS" });
exports.sagas = redux_saga_1.default();
const configureStore = (initialState) => {
    const middlewares = [exports.sagas];
    return redux_1.createStore(exports.reducers, initialState, redux_1.applyMiddleware(...middlewares));
};
const store = configureStore();
exports.loadSagas(exports.sagas, app_1.appSagas);
exports.default = store;
//# sourceMappingURL=index.js.map