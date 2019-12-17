import React, { Component } from "react";
import MenuItemNoTitle from "../MenuItemNoTitle";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "./index.css";

class MenuNoTitle extends Component {
  render() {
    return (
      <div className="d-flex flex-column w-100">
        <ButtonGroup vertical className="w-100">
          {this.props.menuItems.map((item, idx) => (
            <MenuItemNoTitle
              selected={this.props.selected === item.nameItem ? true : false}
              key={idx}
              item={item}
              changeWindow={this.props.changeWindow}
            ></MenuItemNoTitle>
          ))}
        </ButtonGroup>
      </div>
    );
  }
}

export default MenuNoTitle;
