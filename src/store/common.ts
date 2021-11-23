export interface IAction<T, P> {
    type: T;
    payload?: P;
}

export interface ITweetItem {
    id: string;
    text: string;
    url: string;
    createId: string;
}