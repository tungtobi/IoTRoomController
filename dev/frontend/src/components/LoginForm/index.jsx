import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import handeInput from "../../validation";
import "../HomeBanner/style.css";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameValid: null,
      passwordValid: null
    };
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    const valid = handeInput(name, value);
    this.setState({
      nameValid: valid
    });
  }

  render() {
    return (
      <Form>
        <Form.Label style={{ marginBottom: "24px" }}>
          <h2>Đăng nhập</h2>
          <small>
            Nếu bạn chưa có tài khoản hãy liên hệ admin để{" "}
            <span>
              <i className="blue-text">đăng ký</i>
            </span>
          </small>
        </Form.Label>
        <Form.Group>
          <Form.Label>Tên tài khoản</Form.Label>
          <Form.Control
            type="text"
            placeholder="username"
            name="username"
            onChange={this.handleChange}
            isInvalid={!this.state.usernameValid === false}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            name="password"
            onChange={this.handleChange}
            isInvalid={!this.state.passwordValid === false}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Check type="checkbox" label="Lưu tài khoản" />
        </Form.Group>
        <Link to="/dashboard">
          <Button onClick={this.props.onSubmit} type="submit" block>
            Đăng nhập
          </Button>
        </Link>
      </Form>
    );
  }
}

export default LoginForm;
