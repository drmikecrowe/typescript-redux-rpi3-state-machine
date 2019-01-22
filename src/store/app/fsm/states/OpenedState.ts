const debug_reducer = require('debug')('fsm:reducer:OpenedState');
const debug_saga = require('debug')('fsm:saga:OpenedState');

import update from "immutability-helper";
import { Action } from "redux";
import {call, put, select, takeEvery} from 'redux-saga/effects';
import { ON_BEFORE_OPENED_STATE, OPENED_STATE, ON_LEAVE_OPENED_STATE } from "../fsmDefinitions";
import { FsmState } from "../index";
import * as StateMachine from '@taoqf/javascript-state-machine';


// ***************** [ States ] ***************** //
export interface OpenedStateState {
}

export let initialOpenedStateState: OpenedStateState = {
};

// ***************** [ Sagas ] ***************** //
export function* onBeforeOpenedStateSaga() {
    yield takeEvery(ON_BEFORE_OPENED_STATE, function* () {
        debug_saga(`onBeforeOpenedStateSagas: ON_BEFORE_OPENED_STATE`);
    });
}
export function* OpenedStateSaga() {
    yield takeEvery(OPENED_STATE, function* () {
        debug_saga(`OpenedStateSagas: OPENED_STATE`);
    });
}
export function* onLeaveOpenedStateSaga() {
    yield takeEvery(ON_LEAVE_OPENED_STATE, function* () {
        debug_saga(`onLeaveOpenedStateSagas: ON_LEAVE_OPENED_STATE`);
    });
}

export const OpenedStateSagas: Function[] = [
    onBeforeOpenedStateSaga, 
    OpenedStateSaga,  
    onLeaveOpenedStateSaga
];

// ***************** [ Reducer ] ***************** //

export let fsmOpenedStateReducer = (state = initialOpenedStateState, { type }: Action): OpenedStateState => {
    switch (type) {
        case OPENED_STATE:
            debug_reducer(type);
            // ### stateNameCaps-reducer-start
            // ### stateNameCaps-reducer-end
            return state;
        default:
            return state;
    }
};











