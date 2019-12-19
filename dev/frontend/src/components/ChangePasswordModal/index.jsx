import React from "react";
import { Button, ButtonToolbar, Spinner, Alert } from "react-bootstrap";
import ChangePasswordForm from "./form";
import CenteredModal from "../CenteredModal/index";

import handleInput from "../../logic/validation";

import * as userServices from "../../services/user";

import getErrorMessage from "../../services/error";

class ChangePasswordModal extends CenteredModal {
  constructor(props) {
    super(props);

    this.state = {
      password: null,
      cfPassword: null,
      passwordValid: true,
      cfPasswordValid: true,
      updating: null,
      response: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.onSuccess = this.onSuccess.bind(this);
    this.onFailure = this.onFailure.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.show === false)
      return {
        password: null,
        cfPassword: null,
        passwordValid: true,
        cfPasswordValid: true,
        updating: null
      };
    else return null;
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });

    const valid = handleInput(name, value, this.state.password);

    this.setState({
      [name + "Valid"]: valid
    });

    this.setState(prev => ({
      cfPasswordValid:
        prev.password === prev.cfPassword || prev.cfPassword === null
    }));

    if (name === "password")
      this.setState(prevState => ({
        passwordValid:
          prevState.passwordValid &&
          prevState.password !== this.props.prev.password
      }));
  }

  async handleSubmit() {
    const { password } = this.state;
    this.setState({ updating: true });

    if (!this.props.self) {
      const { username } = this.props;

      await userServices.changePassword(
        username,
        password,
        this.onSuccess,
        this.onFailure
      );
    } else {
      await userServices.changeSelfPassword(
        password,
        this.onSuccess,
        this.onFailure
      );
    }
  }

  onSuccess(res, req) {
    this.props.onHide();
    this.setState({ updating: null });
    this.props.onSuccess(req);
  }

  onFailure(res) {
    let response = "Time out";

    if (res) response = getErrorMessage(res.error_code);

    this.setState({ updating: false, response });
  }

  getTitle() {
    return "Change Password";
  }

  getBody() {
    const alert = (
      <Alert
        variant="danger p-2 mb-2 mt-1"
        show={this.state.updating === false}
      >
        <small>
          Oops! You got an error! Please check your connection and try again.
          <br />
          {this.state.response}.
        </small>
      </Alert>
    );

    const form = (
      <ChangePasswordForm
        onSubmit={this.handleSubmit}
        onChange={this.handleChange}
        passwordValid={this.state.passwordValid}
        cfPasswordValid={this.state.cfPasswordValid}
      />
    );

    return (
      <div>
        {form}
        {alert}
      </div>
    );
  }

  isFormValid() {
    const { password, passwordValid, cfPassword, cfPasswordValid } = this.state;

    return (
      password !== null &&
      cfPassword !== null &&
      passwordValid === true &&
      cfPasswordValid === true
    );
  }

  getFooter() {
    const active = this.isFormValid() && this.state.updating !== true;

    return (
      <ButtonToolbar>
        <Button onClick={this.props.onHide} variant="light">
          Close
        </Button>
        <Button onClick={this.handleSubmit} disabled={!active}>
          {this.state.updating ? (
            <div>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />{" "}
              Processing
            </div>
          ) : (
            "Save Change"
          )}
        </Button>
      </ButtonToolbar>
    );
  }
}

export default ChangePasswordModal;
