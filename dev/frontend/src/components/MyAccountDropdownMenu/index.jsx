import React, { Component } from "react";
import { Dropdown, Popover } from "react-bootstrap";
import { Redirect } from "react-router-dom";

class MyAccountDropdownMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogout: null
    };

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    localStorage.clear();

    this.setState({ isLogout: true });
  }

  render() {
    if (this.state.isLogout === true) return <Redirect to="/" />;

    return (
      <React.Fragment>
        <Popover.Title>
          <div className="popover-title-text">Hello Lâm</div>
        </Popover.Title>
        <Popover.Content className="py-2 px-0">
          <Dropdown.Item
            className="myaccount-menu-item"
            onClick={this.showProfileEditorModal}
          >
            View Your Profile
          </Dropdown.Item>
          <Dropdown.Item
            className="myaccount-menu-item"
            onClick={this.showProfileEditorModal}
          >
            Change Password
          </Dropdown.Item>
          <Dropdown.Item
            className="myaccount-menu-item"
            onClick={this.handleLogout}
          >
            Logout!
          </Dropdown.Item>
        </Popover.Content>
      </React.Fragment>
    );
  }
}

export default MyAccountDropdownMenu;
