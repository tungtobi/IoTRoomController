import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./index.css";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-light navbar-white py-2 px-0">
        <span className="navbar-brand pl-2-percent d-none d-md-block">
          <h3 className="navbar-title">Dashboard > {this.props.nameWindow}</h3>
        </span>
        <span className="form-inline pr-1-percent fit-content ">
          <Button variant="link">
            <i className="fas fa-bell navbar-icon" />
          </Button>
          <Button variant="link">
            <i className="fas fa-user-circle navbar-icon" />
          </Button>
        </span>
      </nav>
    );
  }
}

export default Navbar;
