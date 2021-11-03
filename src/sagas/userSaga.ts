import { put } from "redux-saga/effects";
import { authenticateUserType, userActionType } from "store/user";
import { authService, UserInfo } from "firebaseInstance";

export function* signInUser(action: authenticateUserType) {
    try {
        if (action.payload) {
            const user_info: UserInfo = yield authService.signIn(
                action.payload.email,
                action.payload.password
            );

            yield put({
                type: userActionType.updateUserInfo_Success,
                payload: {
                    user_info: user_info,
                },
            });
        }
    } catch (e) {
        yield put({
            type: userActionType.updateUserInfo_Failure,
            payload: {
                error: "test",
            },
        });
    }
}

export function* createUser(action: authenticateUserType) {
    yield put({
        type: userActionType.updateUserInfo_Failure,
        payload: {
            error: "test",
        },
    });
}
