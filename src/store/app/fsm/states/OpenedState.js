"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_reducer = require('debug')('fsm:reducer:OpenedState');
const debug_saga = require('debug')('fsm:saga:OpenedState');
const effects_1 = require("redux-saga/effects");
const fsmDefinitions_1 = require("../fsmDefinitions");
exports.initialOpenedStateState = {};
// ***************** [ Sagas ] ***************** //
function* onBeforeOpenedStateSaga() {
    yield effects_1.takeEvery(fsmDefinitions_1.ON_BEFORE_OPENED_STATE, function* () {
        debug_saga(`onBeforeOpenedStateSagas: ON_BEFORE_OPENED_STATE`);
    });
}
exports.onBeforeOpenedStateSaga = onBeforeOpenedStateSaga;
function* OpenedStateSaga() {
    yield effects_1.takeEvery(fsmDefinitions_1.OPENED_STATE, function* () {
        debug_saga(`OpenedStateSagas: OPENED_STATE`);
    });
}
exports.OpenedStateSaga = OpenedStateSaga;
function* onLeaveOpenedStateSaga() {
    yield effects_1.takeEvery(fsmDefinitions_1.ON_LEAVE_OPENED_STATE, function* () {
        debug_saga(`onLeaveOpenedStateSagas: ON_LEAVE_OPENED_STATE`);
    });
}
exports.onLeaveOpenedStateSaga = onLeaveOpenedStateSaga;
exports.OpenedStateSagas = [
    onBeforeOpenedStateSaga,
    OpenedStateSaga,
    onLeaveOpenedStateSaga
];
// ***************** [ Reducer ] ***************** //
exports.fsmOpenedStateReducer = (state = exports.initialOpenedStateState, { type }) => {
    switch (type) {
        case fsmDefinitions_1.OPENED_STATE:
            debug_reducer(type);
            // ### stateNameCaps-reducer-start
            // ### stateNameCaps-reducer-end
            return state;
        default:
            return state;
    }
};
//# sourceMappingURL=OpenedState.js.map