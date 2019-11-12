import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../HomeBanner/style.css';

class LoginForm extends Component {
    render() { 
        return (
            <Form onSubmit={this.props.onSubmit}>
                <Form.Label style={{marginBottom: '24px'}}>
                    <h2>Đăng nhập</h2>
                    <small>Nếu bạn chưa có tài khoản hãy <span >
                        <i className="blue-text" onClick={this.props.onChangeView}>đăng ký</i>
                    </span>.</small>
                </Form.Label>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Địa chỉ email</Form.Label>
                    <Form.Control type="email" placeholder="email" required />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control type="password" placeholder="password" required />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Lưu tài khoản" />
                </Form.Group>
                <Button variant="primary" type="submit" block>
                    Đăng nhập
                </Button>
            </Form>
        );
    }
}
 
export default LoginForm;