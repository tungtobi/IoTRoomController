import React, { Component } from "react";
import { Form } from "react-bootstrap";
import handleInput from "../../logic/validation";

class ChangePasswordForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: null,
      cfPassword: null,
      passwordValid: true,
      cfPasswordValid: true
    };

    this.handleChange = this.handleChange.bind(this);
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

  render() {
    return (
      <Form>
        <Form.Group controlId="password">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            name="password"
            onChange={this.handleChange}
            isInvalid={!this.state.passwordValid}
          />
          <Form.Control.Feedback type="invalid">
            Password must be at least 5 characters long
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="cfPassword">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="retype password"
            name="cfPassword"
            onChange={this.handleChange}
            isInvalid={!this.state.cfPasswordValid}
          />
          <Form.Control.Feedback type="invalid">
            Invalid confirmed password
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
    );
  }
}

export default ChangePasswordForm;
