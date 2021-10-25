import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import { UserInfo } from "firebaseInstance";
import Navigation from "components/Navigation";
import Profile from "./Profile";

interface IAppRouterProps {
  userInfo: UserInfo | null;
  refreshUser: () => void;
}

function AppRoute(props: IAppRouterProps) {
  if (props.userInfo) {
    return (
      <React.Fragment>
        <Route exact={true} path="/">
          <Home userInfo={props.userInfo} />
        </Route>
        <Route exact={true} path="/profile">
          <Profile userInfo={props.userInfo} refreshUser={props.refreshUser} />
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

function AppRouter(props: IAppRouterProps) {
  return (
    <HashRouter>
      {props.userInfo && <Navigation userInfo={props.userInfo} />}
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
          <AppRoute userInfo={props.userInfo} refreshUser={props.refreshUser} />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default AppRouter;
