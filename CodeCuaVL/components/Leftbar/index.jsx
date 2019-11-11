import React, { Component } from "react";
import Avatar from "../Avatar/index";
import Menu from "../Menu/index";
class Leftbar extends Component {
  state = {
    menuItems: this.props.menuItems,
    avatar: this.props.avatar,
    changeWindow: this.props.changeWindow
  };
  render() {
    return (
      <div className="bg-primary">
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
