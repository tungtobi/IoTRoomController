import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomeBanner from "./components/HomeBanner/index";
import Header from "./components/Header";

import "bootstrap/dist/css/bootstrap.min.css";
import AccountAdditionModal from "./components/AccountAdditionModal";

//Store
// import { createStore } from "redux";
// import reducer from "./reducers/index";
// import { Provider } from "react-redux";

// const store = createStore(reducer);

ReactDOM.render(
  // <AccountAdditionModal show={true} />,
  // <Provider store={store}>
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
  // </Provider>
  document.getElementById("root")
);
