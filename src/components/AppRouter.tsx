import React, { useEffect } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import { firebaseAuth, UserInfo } from "firebaseInstance";
import Navigation from "components/Navigation";
import Profile from "./Profile";
import { useSelector } from "react-redux";
import { rootState } from "store";
import { UserState } from "store/user";

interface IAppRouterProps {
    userInfo: UserInfo | undefined;
}

function AppRoute(props: IAppRouterProps) {
    useEffect(() => {
        firebaseAuth.onAuthStateChanged((user) => {
            //setInit(true);
        });
    }, []);

    if (props.userInfo) {
        return (
            <React.Fragment>
                <Route exact={true} path="/">
                    <Home userInfo={props.userInfo} />
                </Route>
                <Route exact={true} path="/profile">
                    <Profile userInfo={props.userInfo} />
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
    const state = useSelector<rootState>((state) => state?.user) as UserState;

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
