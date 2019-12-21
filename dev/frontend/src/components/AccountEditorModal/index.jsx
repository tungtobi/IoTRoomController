import CenteredModal from "../CenteredModal/index";
import React from "react";
import { Button, ButtonToolbar, Spinner, Alert } from "react-bootstrap";
import AccountEditorForm from "./form";

import * as userServices from "../../services/user";

import getErrorMessage from "../../services/error";

import handleInput from "../../logic/validation";

class AccountEditorModal extends CenteredModal {
  constructor(props) {
    super(props);

    this.state = {
      profile: { ...props.profile },
      prevProfile: props.profile,
      validation: {},
      process: false,
      showAlert: false,
      change: false,
      response: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFailure = this.handleFailure.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.show === false) {
      return {
        profile: null,
        prevProfile: null,
        process: false,
        showAlert: false
      };
    }

    if (!prevState.prevProfile)
      return {
        profile: { ...nextProps.profile },
        prevProfile: nextProps.profile
      };
    else return null;
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { profile } = this.state;

    profile[name] = value;

    const isChange = obj => {
      return Object.keys(obj).length !== 0;
    };

    this.setState({
      profile,
      change: isChange(this.getChange())
    });

    const valid = handleInput(name, value);

    const validation = { ...this.state.validation };
    validation[name] = valid;

    this.setState({
      validation
    });
  }

  isFormValid() {
    const {
      username,
      first_name,
      last_name,
      phone_number,
      email,
      address
    } = this.state.validation;

    return (
      username !== false &&
      first_name !== false &&
      last_name !== false &&
      phone_number !== false &&
      email !== false &&
      address !== false
    );
  }

  async onSubmit() {
    this.setState({ process: true });

    const change = this.getChange();

    const { username } = this.state.profile;

    if (!this.props.self) {
      const info = {
        username,
        ...change
      };

      await userServices.modify(info, this.props.onSuccess, this.handleFailure);
    } else {
      const info = {
        ...change
      };

      await userServices.modifySelf(
        info,
        this.props.onSuccess,
        this.handleFailure
      );
    }
  }

  handleFailure(res) {
    const response = getErrorMessage(res);

    this.setState({ showAlert: true, process: false, response });
  }

  getChange() {
    const { profile, prevProfile } = this.state;

    let change = {};

    for (var key in profile) {
      if (profile[key] !== prevProfile[key]) {
        change[key] = profile[key];
      }
    }

    return change;
  }

  getTitle() {
    return "User Profile";
  }

  getBody() {
    console.log(this.state.validation);

    return (
      <div>
        <AccountEditorForm
          profile={this.state.profile}
          onSubmit={this.onSubmit}
          handleChange={this.handleChange}
          self={this.props.self}
          validation={this.state.validation}
        />
        <Alert
          variant="danger p-2 mb-2 mt-1"
          show={this.state.showAlert === true}
        >
          <small>
            Oops! You got an error! Cannot update these change.
            <br />
            {this.state.response}
          </small>
        </Alert>
      </div>
    );
  }

  getFooter() {
    const { process, change } = this.state;
    const valid = this.isFormValid();

    return (
      <ButtonToolbar>
        <Button onClick={this.props.onHide} variant="light" disabled={process}>
          Close
        </Button>
        <Button onClick={this.onSubmit} disabled={process || !change || !valid}>
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

export default AccountEditorModal;
