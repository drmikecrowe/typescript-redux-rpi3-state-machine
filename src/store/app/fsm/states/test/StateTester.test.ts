import debug from 'debug';
import SagaTester from 'redux-saga-tester';
import { all, fork } from 'redux-saga/effects';

import { fsmStateReducer } from "../..";
import { 
    fsmTransitionSaga, 
    stateMachineDriver, 
    FSM_CREATE, 
    fireDoOpen, 
    OPENED_STATE 
} from "../../fsmDefinitions";

const log: debug.Debugger = debug("test:test:StateTester.test");

describe("State Machine Sequence Test", () => {
    let sagaTester = null;
    let state: any = {};

    it("can create the state-machine", async () => {
        function* sagas() {
            yield all([fork(stateMachineDriver)]);
        }
        sagaTester = new SagaTester({
            initialState: state,
            reducers: fsmStateReducer,
        });
        try {
            sagaTester.start(fsmTransitionSaga);
        } catch(err) {
            // Ignore .then error
        }  
        await sagaTester.waitFor(FSM_CREATE);
        state = sagaTester.getState();
    });

    it("can fire the fireDoOpen event", async () => {
        sagaTester.dispatch(fireDoOpen());
        await sagaTester.waitFor(OPENED_STATE);
    });

});
