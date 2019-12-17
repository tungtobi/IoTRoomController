import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "../MenuItem/index.css";
class MenuItemNoTitle extends Component {
  render() {
    let style = "menu-item" + (this.props.selected ? " selected" : "");

    return (
      <Link to={this.props.item.link} className="w-100 pt-3">
        <Button
          className={style}
          onClick={() => this.props.changeWindow(this.props.item.nameItem)}
          variant="primary w-100"
        >
          <span className="float-left font-size-24px width-icon-35px">
            <i className={this.props.item.icon}></i>
          </span>
        </Button>
      </Link>
    );
  }
}

export default MenuItemNoTitle;
