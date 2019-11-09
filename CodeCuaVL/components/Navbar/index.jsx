import React, { Component } from 'react';

class Navbar extends Component {
    state = {
    }
    render() { 
        return (
            <nav className="navbar navbar-light bg-light">
                <span className="navbar-brand">
                    <a href="#">Dashboard</a>
                    <a> > {this.props.nameWindow}</a>
                </span>
                <span className="form-inline">
                    <button type="button" className="border btn btn-primary">Notification</button>                    
                    <button type="button" className="border btn btn-primary">Profile Setting</button>                    
                </span>
            </nav>
        );
    }
}
 
export default Navbar;