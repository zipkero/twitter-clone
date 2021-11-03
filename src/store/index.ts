import { applyMiddleware, combineReducers, createStore } from "redux";
import userReducer from "store/user";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "sagas";

const sagaMiddleware = createSagaMiddleware();

export type rootState = {
    user: typeof userReducer;
};

const defaultRootState: rootState = {
    user: userReducer,
};

const rootReducer = combineReducers(defaultRootState);

const middlewares = [sagaMiddleware];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export default store;
