import React, { Component } from "react";
import Avatar from "../Avatar";
import Menu from "../Menu";
import "./index.css";
class Leftbar extends Component {
  render() {
    return (
      <div className="bg-primary leftbar">
        <Avatar avatar={this.props.avatar}></Avatar>
        <Menu
          menuItems={this.props.menuItems}
          changeWindow={this.props.changeWindow}
        ></Menu>
      </div>
    );
  }
}

export default Leftbar;
