import { takeLatest } from "redux-saga/effects";
import { userActionType } from "store/user";
import { signInUser, createUser } from "sagas/userSaga";
import { tActionType } from "store/tweet";
import { getList } from "sagas/tweetSaga";

export function* rootSaga() {
    yield takeLatest(userActionType.signInUser, signInUser);
    yield takeLatest(userActionType.createUser, createUser);
    yield takeLatest(tActionType.set, getList);
}
