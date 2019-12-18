import React, { Component } from "react";
import { Form, Col } from "react-bootstrap";
import handleInput from "../../logic/validation";

class AccountEditorForm extends Component {
  render() {
    let prev = this.props.profile;

    if (!prev) return <p>Fail to fetch!</p>;
    else
      return (
        <Form>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              defaultValue={prev.username}
              disabled
            />
          </Form.Group>
          <Form.Row>
            <Col>
              <Form.Group controlId="first_name">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  defaultValue={prev.first_name}
                  onChange={this.props.handleChange}
                  // isInvalid={!this.state.first_nameValid}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="last_name">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  defaultValue={prev.last_name}
                  onChange={this.props.handleChange}
                  // isInvalid={!this.state.last_nameValid}
                />
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              defaultValue={prev.email}
              onChange={this.props.handleChange}
              // isInvalid={!this.state.emailValid}
            />
            <Form.Control.Feedback type="invalid">
              Invalid email address
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              defaultValue={prev.address}
              onChange={this.props.handleChange}
            />
          </Form.Group>
          <Form.Row>
            <Col>
              <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                {/* <Form.Control
                  type="text"
                  name="gender"
                  defaultValue={prev.gender}
                  onChange={this.props.handleChange}
                  // isInvalid={!this.state.genderValid}
                /> */}
                <Form.Control
                  as="select"
                  name="gender"
                  defaultValue={prev.gender}
                  onChange={this.props.handleChange}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="phone_number">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="phone_number"
                  defaultValue={prev.phone_number}
                  onChange={this.props.handleChange}
                  // isInvalid={!this.state.phone_numberValid}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="role">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  type="text"
                  name="role"
                  defaultValue={prev.role}
                  disabled
                />
              </Form.Group>
            </Col>
          </Form.Row>
        </Form>
      );
  }
}

export default AccountEditorForm;
