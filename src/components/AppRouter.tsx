import React, { useEffect } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import { firebaseAuth, UserInfo } from "firebaseInstance";
import Navigation from "components/Navigation";
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import { userActionCreator } from "store/user";

interface IAppRouterProps {
    userInfo: UserInfo | undefined;
}

function AppRoute(props: IAppRouterProps) {
    const dispatch = useDispatch();
    useEffect(() => {
        firebaseAuth.onAuthStateChanged((user) => {
            dispatch(userActionCreator.authStateChanged(user));
        });
    }, []);

    if (props.userInfo) {
        return (
            <React.Fragment>
                <Route exact={true} path="/">
                    <Home />
                </Route>
                <Route exact={true} path="/profile">
                    <Profile />
                </Route>
            </React.Fragment>
        );
    }
    return (
        <React.Fragment>
            <Route exact={true} path="/">
                <Auth />
            </Route>
        </React.Fragment>
    );
}

function AppRouter() {
    const state = useSelector((state) => state.user);

    return (
        <HashRouter>
            {state.user_info && <Navigation userInfo={state.user_info} />}
            <div
                style={{
                    maxWidth: 890,
                    width: "100%",
                    margin: "0 auto",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Switch>
                    <AppRoute userInfo={state.user_info} />
                </Switch>
            </div>
        </HashRouter>
    );
}

export default AppRouter;
