import { IAction, ITweetItem } from "store/common";

export type TweetState = {
    items: ITweetItem[];
    items_request: boolean;
    items_done: boolean;
    items_error: any;
};

export const tActionType = {
    set: "tweet/get",
    set_success: "tweet/get_success",
    set_failure: "tweet/get_failure",
} as const;

export type getListType = IAction<
    typeof tActionType.set,
    {
        items: ITweetItem[];
    }
>;

export type getListSuccessType = IAction<
    typeof tActionType.set_success,
    {
        items: ITweetItem[];
    }
>;

export type getListFailureType = IAction<
    typeof tActionType.set_failure,
    {
        error: any;
    }
>;

type TweetActionReturnType =
    | getListType
    | getListSuccessType
    | getListFailureType;

export const tweetActionCreator = {
    getList: (items: ITweetItem[]): TweetActionReturnType => ({
        type: tActionType.set,
        payload: {
            items: items,
        },
    }),
};

const initialState: TweetState = {
    items: [],
    items_request: false,
    items_done: false,
    items_error: null,
};

export default function tweetReducer(
    state = initialState,
    action: TweetActionReturnType
): TweetState {
    switch (action.type) {
        case tActionType.set_success:
            return {
                ...state,
                items_request: false,
                items_done: true,
            };
        case tActionType.set_failure:
            return {
                ...state,
                items_request: false,
                items_done: false,
                items_error: action.payload,
            };
    }
    return state;
}
