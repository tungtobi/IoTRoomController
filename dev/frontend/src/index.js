import React from "react";
import ReactDOM from "react-dom";
import HomeBanner from "./components/HomeBanner/index";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

ReactDOM.render(<Router><Header /></Router>, document.getElementById("root"));
