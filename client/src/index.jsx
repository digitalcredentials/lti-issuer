import React from "react";
import ReactDOM from "react-dom";
import { theme } from "@instructure/canvas-theme";
import { EmotionThemeProvider } from "@instructure/emotion";
import App from "./components/App";

ReactDOM.render(
  <EmotionThemeProvider theme={theme}>
    <App />
  </EmotionThemeProvider>,
  document.getElementById("lti_root")
);
