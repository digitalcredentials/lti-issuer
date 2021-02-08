import React from "react";
import ReactDOM from "react-dom";
import { theme } from "@instructure/canvas-theme";
import App from "./components/App";

theme.use();

ReactDOM.render(<App />, document.getElementById("lti_root"));
