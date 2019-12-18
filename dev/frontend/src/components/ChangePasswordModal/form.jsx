import React, { Component } from "react";
import { Form } from "react-bootstrap";

class ChangePasswordForm extends Component {
  render() {
    return (
      <Form onSubmit={this.props.onSubmit}>
        <Form.Group controlId="password">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            name="password"
            onChange={this.props.onChange}
            isInvalid={!this.props.passwordValid}
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
            onChange={this.props.onChange}
            isInvalid={!this.props.cfPasswordValid}
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
