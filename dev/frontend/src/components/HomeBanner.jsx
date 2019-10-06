import React, { Component } from 'react';
import './HomeBanner.css';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

class HomeBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
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
                                    Smart <span>IoT </span><br/>
                                    Room <span>Controller</span>
                                </h1>
                                <h2>{ this.state.isLogin ? "Đăng nhập" : "Đăng ký" }</h2>
                                { !this.state.isLogin && <RegisterForm onSubmit={this.handleSubmit}/> }
                                { this.state.isLogin && <LoginForm onSubmit={this.handleSubmit}/> }
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