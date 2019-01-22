import * as _ from "lodash";
import { combineReducers } from "redux";

// Application relevant
import { fsmStateReducer, fsmSagas, FsmState } from "./fsm";
import { HardwareState, hardwareSagas, hardwareReducer } from "./hardware";

export * from "./fsm";
export * from "./hardware";

export interface AppState {
    fsm: FsmState;
    hardware: HardwareState;
}

export let appSagas = _.concat(fsmSagas, hardwareSagas);

export let appReducer = combineReducers({
    fsm: fsmStateReducer,
    hardware: hardwareReducer
});
