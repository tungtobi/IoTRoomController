import React, { Component } from "react";
import MenuItem from "../MenuItem";
import ButtonGroup from "react-bootstrap/ButtonGroup";

class Menu extends Component {
  render() {
    return (
      <div className="d-flex flex-column w-100">
        <ButtonGroup vertical className="w-100">
          {this.props.menuItems.map(item => (
            <MenuItem
              item={item}
              changeWindow={this.props.changeWindow}
            ></MenuItem>
          ))}
        </ButtonGroup>
      </div>
    );
  }
}

export default Menu;
