import { User } from "firebase/auth";
import { UserInfo } from "firebaseInstance";

interface IAction<T, P> {
    type: T;
    payload?: P;
}

export const userActionType = {
    signInUser: "signInUser",
    createUser: "createUser",

    refreshUser: "refreshUser",

    updateUserInfo_Success: "updateUserInfo_Success",
    updateUserInfo_Failure: "updateUserInfo_Failure",

    changeUserStatus: "changeUserStatus",
} as const;

export type authenticateUserType = IAction<
    typeof userActionType.signInUser,
    {
        email: string;
        password: string;
    }
>;

export type refreshUserType = IAction<typeof userActionType.refreshUser, void>;

type updateUserInfo_Success_Type = IAction<
    typeof userActionType.updateUserInfo_Success,
    {
        user_info?: User;
    }
>;

type updateUserInfo_Failure_Type = IAction<
    typeof userActionType.updateUserInfo_Failure,
    {
        error: string;
    }
>;

type UserActionReturnType =
    | refreshUserType
    | authenticateUserType
    | updateUserInfo_Success_Type
    | updateUserInfo_Failure_Type;

export const userActionCreator = {
    signInUser: (
        email: string,
        password: string
    ): UserActionReturnType => ({
        type: userActionType.signInUser,
        payload: {
            email,
            password,
        },
    }),
    createUser: (
        email: string,
        password: string
    ): UserActionReturnType => ({
        type: userActionType.signInUser,
        payload: {
            email,
            password,
        },
    }),
    refreshUser: (): UserActionReturnType => ({
        type: userActionType.refreshUser,
    }),
};

export type UserState = {
    is_login: boolean;
    user_info?: UserInfo;
    error?: string;
};

const initialState: UserState = {
    is_login: false,
    user_info: undefined,
    error: "",
};

export default function userReducer(
    state = initialState,
    action: UserActionReturnType
): UserState {
    switch (action.type) {
        case userActionType.updateUserInfo_Failure:
            return {
                ...state,
                is_login: false,
                user_info: undefined,
                error: action.payload?.error,
            };
        case userActionType.updateUserInfo_Success:
            return {
                is_login: true,
                user_info: action.payload?.user_info,
            };
    }
    return state;
}
