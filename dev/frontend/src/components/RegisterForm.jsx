import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

class RegisterForm extends Component {
    render() { 
        return (
            <Form onSubmit={this.props.onSubmit}>
                <Form.Label style={{marginBottom: '24px'}}>
                    <h2>Đăng ký</h2>
                    <small>Nếu bạn đã có tài khoản hãy <span>
                        <i className="blue-text" onClick={this.props.onChangeView}>đăng nhập</i>
                    </span>.</small>
                </Form.Label>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Địa chỉ email</Form.Label>
                    <Form.Control type="email" placeholder="email" required />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control type="password" placeholder="password" required />
                    <Form.Text className="text-muted">
                        Tối thiểu 8 ký tự.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPasswordAgain">
                    <Form.Label>Nhập lại mật khẩu</Form.Label>
                    <Form.Control type="password" placeholder="password" required />
                </Form.Group>
                <Button variant="primary" type="submit" block>
                    Đăng ký
                </Button>
            </Form>
        );
    }
}
 
export default RegisterForm;