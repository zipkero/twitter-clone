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

function AppRouter(props: IAppRouterProps) {
  return (
    <HashRouter>
      {props.userInfo && <Navigation userInfo={props.userInfo} />}
      <Switch>
        {props.userInfo ? (
          <React.Fragment>
            <Route exact={true} path="/">
              <Home userInfo={props.userInfo} />
            </Route>
            <Route exact={true} path="/profile">
              <Profile
                userInfo={props.userInfo}
                refreshUser={props.refreshUser}
              />
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
