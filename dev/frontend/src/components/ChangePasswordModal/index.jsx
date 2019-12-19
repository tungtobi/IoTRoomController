import CenteredModal from "../CenteredModal/index";
import React from "react";
import { Button, ButtonToolbar, Spinner, Alert } from "react-bootstrap";
import ChangePasswordForm from "./form";

import handleInput from "../../logic/validation";

import * as userServices from "../../services/user";

class ChangePasswordModal extends CenteredModal {
  constructor(props) {
    super(props);

    this.state = {
      password: null,
      cfPassword: null,
      passwordValid: true,
      cfPasswordValid: true,
      updating: null
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
  }

  async handleSubmit() {
    const { password } = this.state;

    this.setState({ updating: true });

    await userServices.changePassword(password, this.onSuccess, this.onFailure);
  }

  onSuccess() {
    this.props.onHide();
    this.setState({ updating: null });
  }

  onFailure() {
    this.setState({ updating: false });
  }

  getTitle() {
    return "Change password";
  }

  getBody() {
    const alert = (
      <Alert variant="danger p-2 mb-1" show={this.state.updating === false}>
        <small>
          Oops! You got an error! Please check your connection and try again.
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

    if (this.state.updating === false)
      return (
        <div>
          {form}
          {alert}
        </div>
      );
    else return form;
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
        <Button
          onClick={this.props.onHide}
          variant="light"
          style={{ border: "1px solid #c6c6c6", marginInlineEnd: "8px" }}
        >
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
              Submitting
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
