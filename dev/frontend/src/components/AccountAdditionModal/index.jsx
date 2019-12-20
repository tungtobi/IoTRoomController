import CenteredModal from "../CenteredModal/index";
import React from "react";
import { Button, ButtonToolbar, Alert, Spinner } from "react-bootstrap";
import AccountAdditionForm from "./form";

import * as userServices from "../../services/user";

import getErrorMessage from "../../services/error";

class AccountAdditionModal extends CenteredModal {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      first_name: null,
      last_name: null,
      phone_number: null,
      email: null,
      gender: "Male",
      address: null,
      role: "standard",

      showAlert: false,
      process: false,
      response: null
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleFailure = this.handleFailure.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.show === false) {
      return {
        process: false,
        showAlert: false
      };
    }

    return null;
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });

    // if (name === "password" || name === "cfPassword") {
    //   this.setState({
    //     [name]: value
    //   });

    //   let target;
    //   if (name === "password") target = this.state.cfPassword;
    //   else target = this.state.password;

    //   this.setState({
    //     cfPasswordValid: value === target
    //   });
    // }

    // const valid = handleInput(name, value, this.state.password);

    // this.setState({
    //   [name + "Valid"]: valid
    // });
  }

  async onSubmit() {
    this.setState({ process: true });

    const {
      username,
      password,
      first_name,
      last_name,
      phone_number,
      email,
      gender,
      address,
      role
    } = this.state;

    const user = {
      username,
      password,
      first_name,
      last_name,
      phone_number,
      email,
      gender,
      address,
      role
    };

    this.setState(prevState => ({ temp: prevState.temp + 1 }));

    await userServices.add(user, this.props.onSuccess, this.handleFailure);
  }

  handleFailure(res) {
    const response = getErrorMessage(res);

    this.setState({ showAlert: true, process: false, response });
  }

  getTitle() {
    return "Add a new account";
  }

  getBody() {
    return (
      <div>
        <AccountAdditionForm
          onSubmit={this.onSubmit}
          handleChange={this.handleChange}
        />
        <Alert
          variant="danger p-2 mb-2 mt-1"
          show={this.state.showAlert === true}
        >
          <small>
            Oops! You got an error! Cannot create new account.
            <br />
            {this.state.response}
          </small>
        </Alert>
      </div>
    );
  }

  getFooter() {
    const { process } = this.state;

    return (
      <ButtonToolbar>
        <Button onClick={this.props.onHide} variant="light" disabled={process}>
          Close
        </Button>
        <Button onClick={this.onSubmit} disabled={process}>
          {process === true ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />{" "}
              Processing
            </>
          ) : (
            "Save changes"
          )}
        </Button>
      </ButtonToolbar>
    );
  }
}

export default AccountAdditionModal;
