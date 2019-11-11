import React, { Component } from "react";
import MenuItem from "../MenuItem/index";

class Menu extends Component {
  state = {
    menuItems: this.props.menuItems,
    changeWindow: this.props.changeWindow
  };
  render() {
    return (
      <div className="btn-group-vertical w-100">
        {this.state.menuItems.map(item => (
          <MenuItem
            item={item}
            changeWindow={this.state.changeWindow}
          ></MenuItem>
        ))}
      </div>
    );
  }
}

export default Menu;
