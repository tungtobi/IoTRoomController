import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import handleInput from "../../logic/validation";

import "../HomeBanner/style.css";
import "./style.css";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usernameValid: null,
      passwordValid: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    const valid = handleInput(name, value);

    this.setState({
      [name + "Valid"]: valid
    });
  }

  responseGoogle(response) {
    console.log(response);
  }

  render() {
    return (
      <Form>
        <Form.Label className="mb-4">
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
            isInvalid={this.state.usernameValid === false}
            required
          />
          <Form.Control.Feedback type="invalid">
            Tên đăng nhập có độ dài 3-30 ký tự và không được chứa các ký tự đặc
            biệt
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            name="password"
            onChange={this.handleChange}
            isInvalid={this.state.passwordValid === false}
            required
          />
          <Form.Control.Feedback type="invalid">
            Mật khẩu có đội dài tối thiểu 6 ký tự
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Check type="checkbox" label="Lưu tài khoản" />
        </Form.Group>
        <Form.Group>
          <Link to="/dashboard">
            <Button onClick={this.props.onSubmit} type="submit" block>
              Đăng nhập
            </Button>
          </Link>
        </Form.Group>

        <a href="/dashboard">Quên mật khẩu</a>
      </Form>
    );
  }
}

export default LoginForm;
