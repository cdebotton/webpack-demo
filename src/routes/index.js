import React from "react";
import {Route, DefaultRoute} from "react-router";

import App from "../components/App";
import IndexRoute from "./IndexRoute";
import AboutRoute from "./AboutRoute";

const routes = (
  <Route handler={App}>
    <DefaultRoute name="index" handler={IndexRoute} />
    <Route name="about" handler={AboutRoute} />
  </Route>
);

export default routes;
