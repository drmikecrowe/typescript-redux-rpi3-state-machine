import * as _ from "lodash";
import { combineReducers } from "redux";

// Application relevant
import { fsmStateReducer, fsmSagas, IFsmState } from "@src/store/app/fsm";
import { hardwareSagas, hardwareReducer, IHardwareState } from "@src/store/app/hardware";

export * from "./fsm";
export * from "./hardware";

export interface IAppState {
    fsm: IFsmState;
    hardware: IHardwareState;
}

export let appSagas = _.concat(fsmSagas, hardwareSagas);

export let appReducer = combineReducers<IAppState | undefined>({
    fsm: fsmStateReducer,
    hardware: hardwareReducer,
});
