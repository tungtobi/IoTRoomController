import React, { Component } from "react";
import Avatar from "../Avatar";
import Menu from "../Menu";
import MenuNoTitle from "../MenuNoTitle";
import "./index.css";
class Leftbar extends Component {
  render() {
    return (
      <div>
        <div className="leftbar d-none d-md-block">
          <Avatar avatar={this.props.avatar}></Avatar>
          <Menu
            selected={this.props.selected}
            menuItems={this.props.menuItems}
            changeWindow={this.props.changeWindow}
          ></Menu>
        </div>
        <div className="leftbar d-block d-md-none">
          <MenuNoTitle
            selected={this.props.selected}
            menuItems={this.props.menuItems}
            changeWindow={this.props.changeWindow}
          ></MenuNoTitle>
        </div>
      </div>
    );
  }
}

export default Leftbar;
