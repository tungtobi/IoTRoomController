import React, { Component } from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import handleInput from "../../logic/validation";
import * as sessionServices from "../../services/session";

import "../HomeBanner/style.css";
import "./style.css";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      usernameValid: null,
      passwordValid: null,
      isAuthening: null,
      success: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    this.handleLoginFailure = this.handleLoginFailure.bind(this);
    this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;

    const valid = handleInput(name, value);

    this.setState({
      [name]: value,
      [name + "Valid"]: valid
    });
  }

  async handleLogin(event) {
    event.preventDefault();
    this.setState({
      isAuthening: true
    });

    // const proxyurl = "https://cors-anywhere.herokuapp.com/";
    // const url = "http://54.237.117.36:3000/login";

    // fetch(proxyurl + url, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     username: this.state.username,
    //     password: this.state.password
    //   })
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     if (data.error_code === 0) this.handleLoginSuccess(data);
    //     else this.handleLoginFailure();
    //   })
    //   .catch(this.handleLoginFailure);

    await sessionServices.login(
      this.state.username,
      this.state.password,
      this.handleLoginSuccess,
      this.handleLoginFailure
    );
  }

  handleLoginSuccess(res) {
    localStorage.setItem("token", res.token);
    this.setState({ success: true, isAuthening: false });
  }

  handleLoginFailure() {
    this.setState({ success: false, isAuthening: false });
  }

  render() {
    if (this.state.success) return <Redirect to="/dashboard" />;

    return (
      <Form onSubmit={this.handleLogin}>
        <Form.Label className="mb-4">
          <h2>Sign in</h2>
          <small>
            If you don't have an account, please contact admin to{" "}
            <span>
              <i className="blue-text">sign up</i>
            </span>
          </small>
        </Form.Label>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="eg: lamnt"
            name="username"
            onChange={this.handleChange}
            isInvalid={this.state.usernameValid === false}
            required
          />
          <Form.Control.Feedback type="invalid">
            Username must be 3-30 characters long and cannot contain special
            characters
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="eg: ******"
            name="password"
            onChange={this.handleChange}
            isInvalid={this.state.passwordValid === false}
            required
          />
          <Form.Control.Feedback type="invalid">
            Mật khẩu có đội dài tối thiểu 5 ký tự
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>

        <Form.Group>
          <Alert variant="danger p-2" show={this.state.success === false}>
            <small>
              Oops! It looks like you may have forgotten your password.{" "}
              <a href="#reset-password">Click here to reset it.</a>
            </small>
          </Alert>
        </Form.Group>
        <Form.Group>
          <Button
            type="submit"
            block
            disabled={
              !this.state.passwordValid ||
              !this.state.usernameValid ||
              this.state.isAuthening
            }
          >
            {this.state.isAuthening ? (
              <div>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{" "}
                Submitting
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </Form.Group>

        <a href="/dashboard">Forgot your password?</a>
      </Form>
    );
  }
}

export default LoginForm;
