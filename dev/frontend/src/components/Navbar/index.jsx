import React, { Component } from "react";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand">
          <a>Dashboard</a>
          <a> > {this.props.nameWindow}</a>
        </span>
        <span className="form-inline">
          <button
            style={{ color: "#007bff" }}
            type="button"
            className="btn btn-link"
          >
            <i className="fas fa-bell"></i>
          </button>
          <button
            style={{ color: "#007bff" }}
            type="button"
            className="btn btn-link"
          >
            <i className="fas fa-user-circle"></i>
          </button>
        </span>
      </nav>
    );
  }
}

export default Navbar;
