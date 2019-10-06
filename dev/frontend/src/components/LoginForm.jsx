import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

class LoginForm extends Component {
    render() { 
        return (
            <Form style={{marginTop: '24px'}} onSubmit={this.props.onSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Địa chỉ email</Form.Label>
                    <Form.Control type="email" placeholder="email" />
                    <Form.Text className="text-muted">
                        Chúng tôi cam kết không chia sẻ thông tin cho bên thứ 3.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control type="password" placeholder="password" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Lưu tài khoản" />
                </Form.Group>
                <Button variant="primary" type="submit" on>
                    Đăng nhập
                </Button>
            </Form>
        );
    }
}
 
export default LoginForm;