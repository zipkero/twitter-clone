import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import { UserInfo } from "firebaseInstance";
import Navigation from "components/Navigation";
import Profile from "./Profile";

interface IAppRouterProps {
  userInfo: UserInfo | null;
}

function AppRouter(props: IAppRouterProps) {
  return (
    <HashRouter>
      {props.userInfo && <Navigation />}
      <Switch>
        {props.userInfo ? (
          <React.Fragment>
            <Route exact={true} path="/">
              <Home userInfo={props.userInfo} />
            </Route>
            <Route exact={true} path="/profile">
              <Profile />
            </Route>
          </React.Fragment>
        ) : (
          <Route exact={true} path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </HashRouter>
  );
}

export default AppRouter;
