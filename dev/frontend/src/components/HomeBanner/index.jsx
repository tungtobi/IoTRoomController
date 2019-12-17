import React, { Component } from "react";
import "./style.css";
import LoginForm from "../LoginForm";
import { Redirect } from "react-router-dom";

class HomeBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: null
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
            <div className="col-lg-9 col-md-12 home-banner-left d-flex fullscreen align-items-center">
              <div>
                <div className="title">
                  <h1>
                    Smart <span className="blue-text">IoT </span>
                    <br />
                    Room <span className="blue-text">Controller</span>
                  </h1>
                </div>
                <div className="login-form">
                  <LoginForm />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-12" />
          </div>
        </div>
      </section>
    );
  }
}

export default HomeBanner;
