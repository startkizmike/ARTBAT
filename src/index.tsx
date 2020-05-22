import React from "react";
import ReactDOM from "react-dom";

import "./assets/styles/clear.css";

import App from "./App";

const render = (Component: any) => {
  ReactDOM.render(<Component />, document.getElementById("root"));
};

render(App);
