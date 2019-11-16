import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./index.css";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-light bg-light navbar-height">
        <span className="navbar-brand navbar-padding">
          <h2 className="font-weight-light navbar-padding">
            Dashboard > {this.props.nameWindow}
          </h2>
        </span>
        <span className="form-inline navbar-padding">
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
