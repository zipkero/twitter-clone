import { applyMiddleware, combineReducers, createStore } from "redux";
import userReducer, { UserState } from "store/user";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "sagas";
import { DefaultRootState } from "react-redux";

const sagaMiddleware = createSagaMiddleware();

interface DefaultTwitterState {
    user: UserState;
}

declare module "react-redux" {
    interface DefaultRootState extends DefaultTwitterState {}
}

const rootReducer = combineReducers({
    user: userReducer,
});

const middlewares = [sagaMiddleware];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export default store;
