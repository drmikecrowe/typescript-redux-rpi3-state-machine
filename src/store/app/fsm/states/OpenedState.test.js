"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_saga_tester_1 = require("redux-saga-tester");
const fsmDefinitions_1 = require("../fsmDefinitions");
const __1 = require("..");
describe("fireDoOpenSaga", () => {
    let sagaTester = null;
    let state = {};
    it('can create the state-machine', function () {
        return __awaiter(this, void 0, void 0, function* () {
            sagaTester = new redux_saga_tester_1.default({
                initialState: state,
                reducers: __1.fsmStateReducer,
            });
            sagaTester.start(fsmDefinitions_1.stateMachineDriver);
            yield sagaTester.waitFor(fsmDefinitions_1.FSM_CREATE);
            state = sagaTester.getState();
        });
    });
    it('cannot fire the close event while closed', function () {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield sagaTester.dispatch(fsmDefinitions_1.fireDoClose());
            }
            catch (err) {
                state = sagaTester.getState();
            }
        });
    });
    it("can fire the open event while closed", () => __awaiter(this, void 0, void 0, function* () {
        yield sagaTester.dispatch(fsmDefinitions_1.fireDoOpen());
        sagaTester.waitFor(fsmDefinitions_1.OPENED_STATE);
    }));
    it("can fire the close event while open", () => __awaiter(this, void 0, void 0, function* () {
        yield sagaTester.dispatch(fsmDefinitions_1.fireDoClose());
        sagaTester.waitFor(fsmDefinitions_1.CLOSED_STATE);
    }));
});
//# sourceMappingURL=OpenedState.test.js.map