import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./index.css";
class MenuItem extends Component {
  render() {
    let style = "menu-item" + (this.props.selected ? " selected" : "");
    console.log(style);

    return (
      <Link to={this.props.item.link} className="w-100 my-2">
        <button
          className={style}
          onClick={() => this.props.changeWindow(this.props.item.nameItem)}
        >
          <span className="float-left font-size-24px width-icon-35px">
            <i className={this.props.item.icon}></i>
            <span className="px-1">{this.props.item.nameItem}</span>
          </span>
        </button>
      </Link>
    );
  }
}

export default MenuItem;
