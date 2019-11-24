import React, { Component } from "react";
import "./style.css";
import LoginForm from "../LoginForm";
// import DeviceEditorModal from "../DeviceEditorModal";
import DeviceAdditionModal from "../DeviceAdditionModal";
import AccountAdditionModal from "../AccountAdditionModal";
import ScenarioAdditionModal from "../ScenarioAdditionModal";
import AccountEditorModal from "../AccountEditorModal";

// import FacebookLogin from "react-facebook-login";

class HomeBanner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      direction: null,
      isLogin: true,
      showModal: false
    };

    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.changeState = this.changeState.bind(this);
  }

  showModal() {
    this.setState({
      showModal: true
    });
  }

  closeModal() {
    this.setState({
      showModal: false
    });
  }

  handleLogin() {
    console.log("authen");

    this.showModal();
  }

  handleRegister() {}

  changeState() {
    this.setState(prevState => ({
      isLogin: !prevState.isLogin
    }));
  }

  render() {
    // const responseFacebook = response => {
    //   console.log(response);
    // };
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
                  <LoginForm onSubmit={this.handleLogin} />
                </div>
                {/* <FacebookLogin
                  appId="1218668471665557" //APP ID NOT CREATED YET
                  fields="name,email,picture"
                  callback={responseFacebook}
                /> */}
              </div>
            </div>
            <div className="col-lg-3 col-md-12" />
          </div>
        </div>
        <AccountEditorModal
          show={this.state.showModal}
          onHide={this.closeModal}
        />
      </section>
    );
  }
}

export default HomeBanner;
