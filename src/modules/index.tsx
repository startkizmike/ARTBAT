import React from "react";
import { Route, Switch } from "react-router";

import Layout from "Layout";

import Insert from "./Insert";
import Spinner from "./Spinner";
import Result from "./Result";

function Routes() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Insert} />
        <Route exact path="/spinner" component={Spinner} />
        <Route exact path="/result" component={Result} />
      </Switch>
    </Layout>
  );
}

export default React.memo(Routes);
