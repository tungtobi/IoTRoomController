import React, { Component } from "react";
import "./style.css";
import RegisterForm from "../RegisterForm";
import LoginForm from "../LoginForm";
import { Carousel } from "react-bootstrap";
import DeviceAdditionModal from "../DeviceAdditionModal";
import ScenarioAdditionForm from "../ScenarioAdditionModal";
import ScenarioAdditionModal from "../ScenarioAdditionModal";

class HomeBanner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      direction: null,
      isLogin: true,
      modal: {
        show: false
      }
    };

    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.changeState = this.changeState.bind(this);
  }

  showModal() {
    this.setState({
      modal: {
        show: true
      }
    });
  }

  closeModal() {
    this.setState({
      modal: {
        show: false
      }
    });
  }

  handleLogin() {
    console.log(this);

    this.showModal();

    console.log(this);
  }

  handleRegister() {}

  changeState() {
    this.setState(prevState => ({
      isLogin: !prevState.isLogin
    }));
  }

  toggleCarousel = direction => {
    let index = this.state.index;

    if (direction === "next") index++;
    else if (direction === "prev") index--;

    this.setState({
      direction,
      index
    });
  };

  render() {
    return (
      <section className="home-banner-area">
        <div className="container">
          <div className="row justify-content-end fullscreen">
            <div className="col-lg-6 col-md-12 home-banner-left d-flex fullscreen align-items-center">
              <div>
                <h1>
                  Smart <span className="blue-text">IoT </span>
                  <br />
                  Room <span className="blue-text">Controller</span>
                </h1>
                <Carousel
                  indicators={false}
                  controls={false}
                  activeIndex={this.state.index}
                  direction={this.state.direction}
                >
                  <Carousel.Item>
                    <LoginForm
                      onChangeView={() => this.toggleCarousel("next")}
                      onSubmit={this.handleLogin}
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <RegisterForm
                      onChangeView={() => this.toggleCarousel("prev")}
                      onSubmit={this.handleRegister}
                    />
                  </Carousel.Item>
                </Carousel>

                <ScenarioAdditionModal
                  show={this.state.modal.show}
                  onHide={this.closeModal}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-12" />
          </div>
        </div>
      </section>
    );
  }
}

export default HomeBanner;
