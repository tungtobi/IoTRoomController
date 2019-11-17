import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./index.css";
class MenuItem extends Component {
  render() {
    return (
      <Link to={this.props.item.link} className="w-100 py-2">
        <Button
          className="menu-item"
          onClick={() => this.props.changeWindow(this.props.item.nameItem)}
          variant="primary w-100"
        >
          <span className="float-left font-size-24px">
            <i className={this.props.item.icon}></i>
            <a className="px-xl-2 ">{this.props.item.nameItem}</a>
          </span>
        </Button>
      </Link>
    );
  }
}

export default MenuItem;
