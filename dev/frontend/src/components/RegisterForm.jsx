import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

class RegisterForm extends Component {
    render() { 
        return (
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Địa chỉ email</Form.Label>
                    <Form.Control type="email" placeholder="email" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control type="password" placeholder="password" />
                </Form.Group>
                <Form.Group controlId="formBasicPasswordAgain">
                    <Form.Label>Nhập lại mật khẩu</Form.Label>
                    <Form.Control type="password" placeholder="password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Đăng ký
                </Button>
            </Form>
        );
    }
}
 
export default RegisterForm;