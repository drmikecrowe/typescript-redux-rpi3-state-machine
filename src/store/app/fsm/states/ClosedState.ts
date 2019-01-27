import debug from "debug";
const dbg: debug.Debugger = debug("fsm:states:ClosedState");

import update from "immutability-helper";
import { Action } from "redux";
import { delay, race, select, take, takeEvery } from "redux-saga/effects";
import { CLOSED_STATE, ON_BEFORE_CLOSED_STATE, ON_LEAVE_CLOSED_STATE, CANCEL_TRANSITION } from "../fsmDefinitions";
import { IFsmState, getFsmStateMachine } from "../index";


// ***************** [ States ] ***************** //
export interface IClosedState {}

export let initialClosedState: IClosedState = {};

// ***************** [ Sagas ] ***************** //
export function* onBeforeClosedStateSaga() {
    const fsm: StateMachine = yield select(getFsmStateMachine);
    yield takeEvery(ON_BEFORE_CLOSED_STATE, function* () {
        dbg(`onBeforeClosedStateSagas: ON_BEFORE_CLOSED_STATE`);
        const { wait, undo } = yield race({
            undo: take(CANCEL_TRANSITION),
            wait: delay(1),
        });
        const f: any = fsm._fsm;
        if (!!undo) {
            f[`${f[`CURRENT_TRANSITION`]}_CANCEL`] = true;
            dbg(`Cancelling CLOSED_STATE`);
        }
    });
}
export function* ClosedStateSaga() {
    yield takeEvery(CLOSED_STATE, function* () {
        dbg(`ClosedStateSagas: CLOSED_STATE`);
    });
}
export function* onLeaveClosedStateSaga() {
    const fsm: StateMachine = yield select(getFsmStateMachine);
    yield takeEvery(ON_LEAVE_CLOSED_STATE, function* () {
        dbg(`onLeaveClosedStateSagas: ON_LEAVE_CLOSED_STATE`);
        const { wait, undo } = yield race({
            undo: take(CANCEL_TRANSITION),
            wait: delay(1),
        });
        const f: any = fsm._fsm;
        if (!!undo) {
            f[`${f[`CURRENT_TRANSITION`]}_CANCEL`] = true;
            dbg(`Cancelling CLOSED_STATE`);
        }
    });
}

export const ClosedStateSagas: Array<() => void> = [
    onBeforeClosedStateSaga, 
    ClosedStateSaga,  
    onLeaveClosedStateSaga
];

// ***************** [ Reducer ] ***************** //

export let fsmClosedStateReducer = (state = initialClosedState, { type }: Action): IClosedState => {
    // dbg(`fsmClosedStateReducer: ${type}`);
    switch (type) {
        case CLOSED_STATE:
            dbg(`fsmClosedStateReducer: ${type}`);
            return state;
        default:
            return state;
    }
};











