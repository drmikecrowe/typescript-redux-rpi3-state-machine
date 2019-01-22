// prettier-ignore
const debug = require("debug")("fsm:" + __filename.replace(/^.*(src)/, "$1").replace(/.[jt]s}/, "").replace(/\//g, ":"));

export const isWin = process.platform === "win32" || process.platform === "linux";

import { Action, applyMiddleware, combineReducers, createStore, Store } from "redux";
import { cancel, fork, join, race, take } from "redux-saga/effects";
import { appReducer, appSagas, AppState } from "./app";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";

export * from "./app";
export * from "./constants";

export { Log } from "../logger";

export interface PayloadAction<T> extends Action {
    payload: T;
}

export interface State {
    app: AppState;
}

export let reducers = combineReducers<State | undefined>({
    app: appReducer,
});

export let loadSagas = (sagas: SagaMiddleware<object>, newSagas: any[]) => {
    newSagas
        .map(
            saga =>
                function* main() {
                    const task = yield fork(saga);

                    const { done, canceled } = yield race({
                        done: join(task),
                        canceled: take("CANCEL_SAGAS"),
                    });

                    if (canceled) yield cancel(task);
                },
        )
        .forEach(saga => sagas.run(saga));
};

export let cancelSagas = (store: Store<State>) => store.dispatch({ type: "CANCEL_SAGAS" });

export const sagas = createSagaMiddleware();

const configureStore = (initialState?: State): Store<State | undefined> => {
    const middlewares: any[] = [sagas];
    return createStore(reducers, initialState, applyMiddleware(...middlewares));
};

const store = configureStore();
loadSagas(sagas, appSagas);

export default store;
