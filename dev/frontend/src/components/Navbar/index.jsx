import React, { Component } from "react";
import { Button, OverlayTrigger, Popover, Badge } from "react-bootstrap";

import AccountEditorModal from "../AccountEditorModal";
import Notification from "../Notification";
import MyAccountDropdownMenu from "../MyAccountDropdownMenu";
import ChangePasswordModal from "../ChangePasswordModal";

import * as notifyServices from "../../services/notify";

import "./index.css";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notify: [],
      showProfileEditor: false,
      showChangePassword: false
    };

    this.hideProfileEditorModal = this.hideProfileEditorModal.bind(this);
    this.showProfileEditorModal = this.showProfileEditorModal.bind(this);

    this.hideChangePasswordModal = this.hideChangePasswordModal.bind(this);
    this.showChangePasswordModal = this.showChangePasswordModal.bind(this);

    this.handleFetchNotifySuccess = this.handleFetchNotifySuccess.bind(this);
  }

  componentDidMount() {
    this.fetchNotifications();
  }

  hideProfileEditorModal() {
    this.setState({ showProfileEditor: false });
  }

  showProfileEditorModal() {
    this.setState({ showProfileEditor: true });
  }

  hideChangePasswordModal() {
    this.setState({ showChangePassword: false });
  }

  showChangePasswordModal() {
    this.setState({ showChangePassword: true });
  }

  async fetchNotifications() {
    await notifyServices.list(this.handleFetchNotifySuccess);
  }

  handleFetchNotifySuccess(res) {
    let notifications = [];

    for (var propName in res)
      if (propName.startsWith("notification_"))
        notifications.push(res[propName]);

    this.setState({ notify: notifications.reverse() });
  }

  render() {
    const unseen = this.state.notify.filter(n => n.seen !== "true").length;

    return (
      <nav className="navbar navbar-white nav-fixed-top px-0">
        <span className="navbar-brand pl-4">
          <h3 className="navbar-title">Dashboard</h3>
        </span>
        <span className="form-inline pr-2 fit-content ">
          <OverlayTrigger
            trigger="click"
            ref="overlay"
            placement="bottom"
            overlay={
              <Popover className="notify-panel">
                <Notification list={this.state.notify} />
              </Popover>
            }
          >
            <Button variant="link p-0">
              {unseen !== 0 && (
                <Badge pill variant="danger notification px-1">
                  {unseen}
                </Badge>
              )}
              <i className="fas fa-bell navbar-icon" />
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={
              <Popover className="myaccount-panel">
                <MyAccountDropdownMenu
                  showProfileEditorModal={this.showProfileEditorModal}
                  showChangePasswordModal={this.showChangePasswordModal}
                />
              </Popover>
            }
          >
            <Button
              variant="link p-0 mx-2"
              onClick={() => this.refs.overlay.hide()}
            >
              <i className="fas fa-user-circle navbar-icon" />
            </Button>
          </OverlayTrigger>
        </span>
        <AccountEditorModal
          show={this.state.showProfileEditor}
          onHide={this.hideProfileEditorModal}
        />
        <ChangePasswordModal
          show={this.state.showChangePassword}
          onHide={this.hideChangePasswordModal}
        />
      </nav>
    );
  }
}

export default Navbar;
