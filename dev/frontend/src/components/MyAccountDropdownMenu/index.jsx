import React, { Component } from "react";
import { Dropdown, Popover } from "react-bootstrap";
import "./style.css";

class MyAccountDropdownMenu extends Component {
  render() {
    return (
      <React.Fragment>
        <Popover.Title>
          <div className="popover-title-text">Hello Lâm</div>
        </Popover.Title>
        <Popover.Content className="py-2 px-0">
          <Dropdown.Item
            className="myaccount-menu-item"
            onClick={this.props.showProfileEditorModal}
          >
            View Your Profile
          </Dropdown.Item>
          <Dropdown.Item
            className="myaccount-menu-item"
            onClick={this.props.showProfileEditorModal}
          >
            Change Password
          </Dropdown.Item>
          <Dropdown.Item
            className="myaccount-menu-item"
            onClick={this.props.handleLogout}
          >
            Sign out!
          </Dropdown.Item>
        </Popover.Content>
      </React.Fragment>
    );
  }
}

export default MyAccountDropdownMenu;
