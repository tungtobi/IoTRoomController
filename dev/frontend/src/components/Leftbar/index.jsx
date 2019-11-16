import React, { Component } from "react";
import Avatar from "../Avatar";
import Menu from "../Menu";
import "./index.css";
class Leftbar extends Component {
  state = {
    menuItems: this.props.menuItems,
    avatar: this.props.avatar,
    changeWindow: this.props.changeWindow
  };
  render() {
    return (
      <div className="bg-primary leftbar">
        <Avatar avatar={this.state.avatar}></Avatar>
        <Menu
          menuItems={this.state.menuItems}
          changeWindow={this.state.changeWindow}
        ></Menu>
      </div>
    );
  }
}

export default Leftbar;
