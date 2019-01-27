import debug from "debug";
const dbg: debug.Debugger = debug("vips:store:index");

export const isWin = ((process.platform === "win32") || (process.platform === "linux"));

import {Action, applyMiddleware, combineReducers, createStore, Store} from 'redux';
import {cancel, fork, join, race, take} from 'redux-saga/effects';
import {appReducer, appSagas, IAppState} from '@src/store/app';
import createSagaMiddleware, {SagaMiddleware} from 'redux-saga';

export * from './app';
export * from './constants';

export interface IPayloadAction<T> extends Action {
    payload: T;
}

export let loadSagas = (sagaList: SagaMiddleware<object>, newSagas: any[]) => {
    newSagas
        .map(
            saga =>
                function* main() {
                    const task = yield fork(saga);

                    const { done, canceled } = yield race({
                        canceled: take("CANCEL_SAGAS"),
                        done: join(task),
                    });

                    if (canceled) { yield cancel(task); }
                },
        )
        .forEach(saga => sagaList.run(saga));
};

export let cancelSagas = (s: Store<IAppState>) => s.dispatch({ type: "CANCEL_SAGAS" });

export const sagas = createSagaMiddleware();

const configureStore = (initialState?: IAppState): Store<IAppState | undefined> => {
    const middlewares: any[] = [sagas];
    return createStore(appReducer, initialState, applyMiddleware(...middlewares));
};

const store = configureStore();
loadSagas(sagas, appSagas);

export default store;
