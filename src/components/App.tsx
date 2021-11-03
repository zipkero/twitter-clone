import React, { useEffect, useState } from "react";
import AppRouter from "components/AppRouter";
import { firebaseAuth } from "firebaseInstance";
import { Provider, useDispatch, useSelector } from "react-redux";
import store, { rootState } from "store";
import { UserState } from "store/user";

export default function App() {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    );
}
