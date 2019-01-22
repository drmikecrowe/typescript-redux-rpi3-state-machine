const debug_reducer = require('debug')('fsm:reducer:ClosedState');
const debug_saga = require('debug')('fsm:saga:ClosedState');

import update from "immutability-helper";
import { Action } from "redux";
import {call, put, select, takeEvery} from 'redux-saga/effects';
import { ON_BEFORE_CLOSED_STATE, CLOSED_STATE, ON_LEAVE_CLOSED_STATE } from "../fsmDefinitions";
import { FsmState } from "../index";
import * as StateMachine from '@taoqf/javascript-state-machine';


// ***************** [ States ] ***************** //
export interface ClosedStateState {
}

export let initialClosedStateState: ClosedStateState = {
};

// ***************** [ Sagas ] ***************** //
export function* onBeforeClosedStateSaga() {
    yield takeEvery(ON_BEFORE_CLOSED_STATE, function* () {
        debug_saga(`onBeforeClosedStateSagas: ON_BEFORE_CLOSED_STATE`);
    });
}
export function* ClosedStateSaga() {
    yield takeEvery(CLOSED_STATE, function* () {
        debug_saga(`ClosedStateSagas: CLOSED_STATE`);
    });
}
export function* onLeaveClosedStateSaga() {
    yield takeEvery(ON_LEAVE_CLOSED_STATE, function* () {
        debug_saga(`onLeaveClosedStateSagas: ON_LEAVE_CLOSED_STATE`);
    });
}

export const ClosedStateSagas: Function[] = [
    onBeforeClosedStateSaga, 
    ClosedStateSaga,  
    onLeaveClosedStateSaga
];

// ***************** [ Reducer ] ***************** //

export let fsmClosedStateReducer = (state = initialClosedStateState, { type }: Action): ClosedStateState => {
    switch (type) {
        case CLOSED_STATE:
            debug_reducer(type);
            // ### stateNameCaps-reducer-start
            // ### stateNameCaps-reducer-end
            return state;
        default:
            return state;
    }
};











