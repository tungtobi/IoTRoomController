import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Navbar from "../Navbar";
import Leftbar from "../Leftbar";
import RenderWindow from "../RenderWindow";

import * as userServices from "../../services/user";
import getErrorMessage from "../../services/error";

import "./index.css";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: null,
      profile: null,
      fetchSuccess: null,
      failureResponse: null
    };

    this.handleFetchProfileSuccess = this.handleFetchProfileSuccess.bind(this);
    this.handleFetchProfileFailure = this.handleFetchProfileFailure.bind(this);
  }

  handleFetchProfileFailure(res) {
    let failureResponse = "Time out";

    if (res) failureResponse = getErrorMessage(res.error_code);

    this.setState({
      fetchSuccess: false,
      failureResponse
    });
  }

  async fetchProfile() {
    await userServices.view(
      this.handleFetchProfileSuccess,
      this.handleFetchProfileFailure
    );
  }

  handleFetchProfileSuccess(res) {
    const { error_code, ...profile } = res;

    this.setState({ profile, fetchSuccess: true });
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    this.setState({ isLogin: token !== null });

    this.fetchProfile();
  }

  render() {
    if (this.state.isLogin === false) return <Redirect to="/" />;

    const { profile } = this.state;

    const isAdmin = profile ? profile.role === "admin" : null;

    const username = profile ? profile.username : null;

    return (
      <div className="background-light">
        <div className="menu-horizontal">
          <Leftbar isAdmin={isAdmin} />
        </div>
        <div className="nav-fixed-top">
          <Navbar profile={this.state.profile}></Navbar>
        </div>
        <div className="dashboard-content">
          <RenderWindow
            fetchProfileSuccess={this.state.fetchSuccess}
            response={this.state.failureResponse}
            username={username}
            isAdmin={isAdmin}
          ></RenderWindow>
        </div>
      </div>
    );
  }
}

export default Header;
