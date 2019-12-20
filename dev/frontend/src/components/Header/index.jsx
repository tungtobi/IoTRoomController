import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Navbar from "../Navbar";
import Leftbar from "../Leftbar";
import RenderWindow from "../RenderWindow";

import * as userServices from "../../services/user";
import * as iotServices from "../../services/iot";
import getErrorMessage from "../../services/error";

import "./index.css";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: null,
      profile: null,

      timeUpdate: {
        seconds: 0,
        minutes: 0,
        hours: 0
      },

      fetchSuccess: null,
      failureResponse: null,

      data: []
    };

    this.handUpdateData = this.handUpdateData.bind(this);
    this.handleFetchProfileSuccess = this.handleFetchProfileSuccess.bind(this);

    this.handleFetchDataSuccess = this.handleFetchDataSuccess.bind(this);
    this.handleFetchDataFailed = this.handleFetchDataFailed.bind(this);
  }

  handUpdateData() {
    this.fetchData();
  }

  async fetchData() {
    await iotServices.data(
      this.handleFetchDataSuccess,
      this.handleFetchDataSuccess
    );
  }

  handleFetchDataSuccess(data) {
    var current = new Date();

    this.setState({
      data: data.result,
      fetchSuccess: true,
      timeUpdate: {
        seconds: current.getSeconds,
        minutes: current.getMinutes,
        hours: current.getHours
      }
    });
  }

  handleFetchDataFailed(res) {
    let failureResponse = "Time out";

    if (res) failureResponse = getErrorMessage(res.error_code);

    this.setState({
      timeUpdate: {
        seconds: -2,
        minutes: -2,
        hours: -2
      },

      fetchSuccess: false,
      failureResponse
    });
  }

  async fetchProfile() {
    await userServices.view(this.handleFetchProfileSuccess, console.log);
  }

  handleFetchProfileSuccess(res) {
    const { error_code, ...profile } = res;

    this.setState({ profile, fetchSuccess: true });
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    this.setState({ isLogin: token !== null });

    this.handUpdateData();
    this.fetchProfile();
  }

  render() {
    if (this.state.isLogin === false) return <Redirect to="/" />;

    const username = this.state.profile ? this.state.profile.username : null;

    return (
      <div className="background-light">
        <div className="menu-horizontal">
          <Leftbar />
        </div>
        <div className="nav-fixed-top">
          <Navbar profile={this.state.profile}></Navbar>
        </div>
        <div className="dashboard-content">
          <RenderWindow
            initialFetchSuccesss={this.state.fetchSuccess}
            initialFailureResponse={this.state.failureResponse}
            username={username}
            timeUpdate={this.state.timeUpdate}
            handUpdateData={this.handUpdateData}
            iotData={this.state.data}
          ></RenderWindow>
        </div>
      </div>
    );
  }
}

export default Header;
