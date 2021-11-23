import { put } from "redux-saga/effects";
import { getListType, tActionType } from "store/tweet";

export function* getList(action: getListType) {
    try {
        yield put({
            type: tActionType.set_success,
            payload: {
                items: action.payload?.items,
            },
        });
    } catch (e) {
        yield put({
            type: tActionType.set_failure,
            payload: e,
        });
    }
}