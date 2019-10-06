import React, { Component } from 'react';
import './HomeBanner.css';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { Button } from 'react-bootstrap'

class HomeBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleLogin() {
        this.changeState();
        
    }

    handleRegister() {
        this.changeState();
    }

    changeState() {
        this.setState(prevState => ({
            isLogin: !prevState.isLogin
        }));
    }

    render() {
        return (
            <section className="home-banner-area">
                <div className="container">
                    <div className="row justify-content-end fullscreen">
                        <div className="col-lg-6 col-md-12 home-banner-left d-flex fullscreen">
                            <div>
                                <h1>
                                    Smart <span className="blue-text">IoT </span><br/>
                                    Room <span className="blue-text">Controller</span>
                                </h1>
                                {!this.state.isLogin && 
                                    <div>
                                        <h2>Đăng ký</h2>
                                        <RegisterForm onSubmit={this.handleRegister}/>
                                </div>}
                                {this.state.isLogin && 
                                    <div>
                                        <div>
                                            <h2>Đăng nhập</h2>
                                            <p>hoặc <span className="blue-text">
                                                <a onClick={this.handleLogin}>đăng ký</a>
                                            </span></p>
                                        </div>
                                        <LoginForm onSubmit={this.handleLogin}/>
                                </div>}
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6"></div>
                    </div>
                </div>
                
            </section>
        );
    }
}

export default HomeBanner;