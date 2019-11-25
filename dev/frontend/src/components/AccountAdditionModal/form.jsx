import React, { Component } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import handleInput from "../../logic/validation";

class AccountAdditionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: null,
      cfPassword: null,
      usernameValid: true,
      passwordValid: true,
      cfPasswordValid: null
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "password" || name === "cfPassword") {
      this.setState({
        [name]: value
      });

      let target;
      if (name === "password") target = this.state.cfPassword;
      else target = this.state.password;

      this.setState({
        cfPasswordValid: value === target
      });
    }

    const valid = handleInput(name, value, this.state.password);

    this.setState({
      [name + "Valid"]: valid
    });
  }

  render() {
    const options = [
      { value: "chocolate", label: "Chocolate" },
      { value: "strawberry", label: "Strawberry" },
      { value: "vanilla", label: "Vanilla" }
    ];
    return (
      <Form>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="username"
            name="username"
            onChange={this.handleChange}
            isInvalid={!this.state.usernameValid}
          />
          <Form.Control.Feedback type="invalid">
            Tên đăng nhập có độ dài 3-30 ký tự và không được chứa các ký tự đặc
            biệt
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            name="password"
            onChange={this.handleChange}
            isInvalid={!this.state.passwordValid}
          />
          <Form.Control.Feedback type="invalid">
            Mật khẩu có đội dài tối thiểu 6 ký tự
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="cf-password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="cfPassword"
            placeholder="confirm password"
            onChange={this.handleChange}
            isValid={this.state.cfPasswordValid}
            isInvalid={this.state.cfPasswordValid === false}
          />
          <Form.Control.Feedback type="invalid">
            Nhập lại mật khẩu không chính xác
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" placeholder="description..." />
        </Form.Group>
        <Form.Group controlId="devices">
          <Form.Label>Devices</Form.Label>
          <Select name="devices" options={options} isMulti />
        </Form.Group>
      </Form>
    );
  }
}

export default AccountAdditionForm;
