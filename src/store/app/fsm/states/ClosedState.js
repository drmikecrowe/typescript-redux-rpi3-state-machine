"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_reducer = require('debug')('fsm:reducer:ClosedState');
const debug_saga = require('debug')('fsm:saga:ClosedState');
const effects_1 = require("redux-saga/effects");
const fsmDefinitions_1 = require("../fsmDefinitions");
exports.initialClosedStateState = {};
// ***************** [ Sagas ] ***************** //
function* onBeforeClosedStateSaga() {
    yield effects_1.takeEvery(fsmDefinitions_1.ON_BEFORE_CLOSED_STATE, function* () {
        debug_saga(`onBeforeClosedStateSagas: ON_BEFORE_CLOSED_STATE`);
    });
}
exports.onBeforeClosedStateSaga = onBeforeClosedStateSaga;
function* ClosedStateSaga() {
    yield effects_1.takeEvery(fsmDefinitions_1.CLOSED_STATE, function* () {
        debug_saga(`ClosedStateSagas: CLOSED_STATE`);
    });
}
exports.ClosedStateSaga = ClosedStateSaga;
function* onLeaveClosedStateSaga() {
    yield effects_1.takeEvery(fsmDefinitions_1.ON_LEAVE_CLOSED_STATE, function* () {
        debug_saga(`onLeaveClosedStateSagas: ON_LEAVE_CLOSED_STATE`);
    });
}
exports.onLeaveClosedStateSaga = onLeaveClosedStateSaga;
exports.ClosedStateSagas = [
    onBeforeClosedStateSaga,
    ClosedStateSaga,
    onLeaveClosedStateSaga
];
// ***************** [ Reducer ] ***************** //
exports.fsmClosedStateReducer = (state = exports.initialClosedStateState, { type }) => {
    switch (type) {
        case fsmDefinitions_1.CLOSED_STATE:
            debug_reducer(type);
            // ### stateNameCaps-reducer-start
            // ### stateNameCaps-reducer-end
            return state;
        default:
            return state;
    }
};
//# sourceMappingURL=ClosedState.js.map