import React, { Component } from 'react';
import './HomeBanner.css';
import RegisterForm from './RegisterForm';

class HomeBanner extends Component {
    render() {
        return (
            <section className="home-banner-area">
                <div className="container">
                    <div className="row justify-content-end fullscreen">
                        <div className="col-lg-6 col-md-12 home-banner-left d-flex fullscreen align-items-center">
                            <div>
                                <h1>
                                    Smart <span>IoT</span><br/>
                                    Room <span>Controller</span>
                                </h1>
                                <RegisterForm/>
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