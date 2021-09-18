import React, { useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

function AppRouter() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <HashRouter>
      <Switch>
        {isLoggedIn ? (
          <Route exact={true} path="/">
            <Home />
          </Route>
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
