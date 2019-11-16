import React, { Component } from "react";
import handleInput from "./validation";
import { Form, InputGroup, Col, Button } from "react-bootstrap";

export default class FormExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: false,
      usernameValid: null,
      usernameError: null
    };
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    const message = handleInput(name, value);
    // console.log(message);

    this.setState({
      usernameValid: message ? false : true,
      usernameError: message
      // validated: true
    });

    console.log(this.state.usernameError);
  }

  handleSubmit(event) {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.setState({
      validated: true
    });
  }

  render() {
    return (
      <Form
        noValidate
        // validated={this.state.validated}
        onSubmit={this.handleSubmit.bind(this)}
      >
        <Form.Row>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              defaultValue="Mark"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              defaultValue="Otto"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                name="username"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                onChange={this.handleChange.bind(this)}
                required
                isValid={this.state.usernameValid}
                isInvalid={
                  !this.state.usernameValid && this.state.usernameValid !== null
                }
              />
              <Form.Control.Feedback type="invalid">
                Tên đăng nhập có độ dài 3-30 ký tự và không được chứa các ký tự
                đặc biệt
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>City</Form.Label>
            <Form.Control type="email" placeholder="City" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>State</Form.Label>
            <Form.Control type="text" placeholder="State" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom05">
            <Form.Label>Zip</Form.Label>
            <Form.Control type="text" placeholder="Zip" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Group>
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
          />
        </Form.Group>
        <Button type="submit">Submit form</Button>
      </Form>
    );
  }
}
