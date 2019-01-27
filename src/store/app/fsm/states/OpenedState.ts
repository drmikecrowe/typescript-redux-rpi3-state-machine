import debug from "debug";
const dbg: debug.Debugger = debug("fsm:states:OpenedState");

import update from "immutability-helper";
import { Action } from "redux";
import { delay, race, select, take, takeEvery } from "redux-saga/effects";
import { OPENED_STATE, ON_BEFORE_OPENED_STATE, ON_LEAVE_OPENED_STATE, CANCEL_TRANSITION } from "../fsmDefinitions";
import { IFsmState, getFsmStateMachine } from "../index";


// ***************** [ States ] ***************** //
export interface IOpenedState {}

export let initialOpenedState: IOpenedState = {};

// ***************** [ Sagas ] ***************** //
export function* onBeforeOpenedStateSaga() {
    const fsm: StateMachine = yield select(getFsmStateMachine);
    yield takeEvery(ON_BEFORE_OPENED_STATE, function* () {
        dbg(`onBeforeOpenedStateSagas: ON_BEFORE_OPENED_STATE`);
        const { wait, undo } = yield race({
            undo: take(CANCEL_TRANSITION),
            wait: delay(1),
        });
        const f: any = fsm._fsm;
        if (!!undo) {
            f[`${f[`CURRENT_TRANSITION`]}_CANCEL`] = true;
            dbg(`Cancelling OPENED_STATE`);
        }
    });
}
export function* OpenedStateSaga() {
    yield takeEvery(OPENED_STATE, function* () {
        dbg(`OpenedStateSagas: OPENED_STATE`);
    });
}
export function* onLeaveOpenedStateSaga() {
    const fsm: StateMachine = yield select(getFsmStateMachine);
    yield takeEvery(ON_LEAVE_OPENED_STATE, function* () {
        dbg(`onLeaveOpenedStateSagas: ON_LEAVE_OPENED_STATE`);
        const { wait, undo } = yield race({
            undo: take(CANCEL_TRANSITION),
            wait: delay(1),
        });
        const f: any = fsm._fsm;
        if (!!undo) {
            f[`${f[`CURRENT_TRANSITION`]}_CANCEL`] = true;
            dbg(`Cancelling OPENED_STATE`);
        }
    });
}

export const OpenedStateSagas: Array<() => void> = [
    onBeforeOpenedStateSaga, 
    OpenedStateSaga,  
    onLeaveOpenedStateSaga
];

// ***************** [ Reducer ] ***************** //

export let fsmOpenedStateReducer = (state = initialOpenedState, { type }: Action): IOpenedState => {
    // dbg(`fsmOpenedStateReducer: ${type}`);
    switch (type) {
        case OPENED_STATE:
            dbg(`fsmOpenedStateReducer: ${type}`);
            return state;
        default:
            return state;
    }
};











