import React, { Component } from "react";
import { Dropdown, Popover } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import "./style.css";
import * as sessionServices from "../../services/session";

class MyAccountDropdownMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogout: false
    };

    this.handleLogout = this.handleLogout.bind(this);
  }

  async handleLogout() {
    this.setState({ isLogout: true });
    await sessionServices.logout();
  }

  render() {
    if (this.state.isLogout === true) {
      localStorage.clear();
      return <Redirect to="/" />;
    }

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
            onClick={this.props.showChangePasswordModal}
          >
            Change Password
          </Dropdown.Item>
          <Dropdown.Item
            className="myaccount-menu-item"
            onClick={this.handleLogout}
          >
            Sign out!
          </Dropdown.Item>
        </Popover.Content>
      </React.Fragment>
    );
  }
}

export default MyAccountDropdownMenu;
