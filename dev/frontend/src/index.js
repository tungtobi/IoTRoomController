import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeBanner from "./components/HomeBanner/index";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/">
        <HomeBanner />
      </Route>
      <Route path="/login">
        <HomeBanner />
      </Route>
      <Route path="/dashboard">
        <Header />
      </Route>
    </Switch>
  </Router>,
  document.getElementById("root")
);
