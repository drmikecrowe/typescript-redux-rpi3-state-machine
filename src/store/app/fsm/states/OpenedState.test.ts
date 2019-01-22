import { call, put, take } from "redux-saga/effects";
import SagaTester from 'redux-saga-tester';
import { fireDoOpenSaga, fireDoOpen, getFsmState, stateMachineDriver, FIRE_DO_OPEN, connectFsm, FSM_CREATE, OPENED_STATE, fireDoClose, fireDoCloseSaga, CLOSED_STATE } from "../fsmDefinitions";
import { FsmState, fsmStateReducer } from "..";

describe("fireDoOpenSaga", () => {
    let sagaTester = null;
    let state: any = {};

    it('can create the state-machine', async function() {
        sagaTester = new SagaTester({
            initialState: state,
            reducers: fsmStateReducer,
        });
        sagaTester.start(stateMachineDriver);
        await sagaTester.waitFor(FSM_CREATE);
        state = sagaTester.getState();
    });

    it('cannot fire the close event while closed', async function() {
        try {
            await sagaTester.dispatch(fireDoClose());
        } catch (err) {
            state = sagaTester.getState();
        }
    }); 

    it("can fire the open event while closed", async () => {
        await sagaTester.dispatch(fireDoOpen());
        sagaTester.waitFor(OPENED_STATE);
    });

    it("can fire the close event while open", async () => {
        await sagaTester.dispatch(fireDoClose());
        sagaTester.waitFor(CLOSED_STATE);
    });
});
