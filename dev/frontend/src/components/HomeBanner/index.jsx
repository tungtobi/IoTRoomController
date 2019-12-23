import React, { Component } from "react";
import LoginForm from "../LoginForm";
import { Redirect } from "react-router-dom";

import "./style.css";

class HomeBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: null,
      showAlert: false
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    this.setState({ isLogin: token !== null });
  }

  render() {
    if (this.state.isLogin === true) return <Redirect to="/dashboard" />;

    return (
      <section className="home-banner-area">
        <div className="container">
          <div className="row justify-content-end fullscreen">
            <div className="col-lg-10 col-md-12 home-banner-left d-flex fullscreen align-items-center">
              <div className="">
                <div className="title">
                  <h1>
                    Smart <span className="blue-text">IoT </span>
                    Eco
                  </h1>
                </div>
                <div className="login-form">
                  <LoginForm />
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-12" />
          </div>
        </div>
      </section>
    );
  }
}

export default HomeBanner;
