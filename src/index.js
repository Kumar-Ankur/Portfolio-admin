import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotificationState from "./context/notification/notification-state";
import App from "./App";
import Dashboard from "./components/dashboard";

ReactDOM.render(
  <Router>
    <Switch>
      <NotificationState>
        <Route exact path="/" component={App} />
        <Route exact path="/dashboard" component={Dashboard} />
      </NotificationState>
    </Switch>
  </Router>,
  document.getElementById("root")
);
