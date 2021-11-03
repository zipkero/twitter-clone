import { takeLatest } from "redux-saga/effects";
import { userActionType } from "store/user";
import { signInUser, createUser } from "sagas/userSaga";

export function* rootSaga() {
    yield takeLatest(userActionType.signInUser, signInUser);
    yield takeLatest(userActionType.createUser, createUser);
}
