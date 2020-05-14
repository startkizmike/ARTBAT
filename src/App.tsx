import React from "react";
import { Router } from "react-router";
import { createBrowserHistory } from "history";

import Routes from "./modules";

export const globalHistory = createBrowserHistory();

export default React.memo(function ({}) {
  return (
    <Router history={globalHistory}>
      <Routes />
    </Router>
  );
});
