import React, { Component } from "react";
import { Button, OverlayTrigger, Popover, Badge } from "react-bootstrap";

import AccountEditorModal from "../AccountEditorModal";
import Notification from "../Notification";
import MyAccountDropdownMenu from "../MyAccountDropdownMenu";
import ChangePasswordModal from "../ChangePasswordModal";

import * as notifyServices from "../../services/notify";
import * as userServices from "../../services/user";

import "./index.css";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notify: null,
      profile: null,
      showProfileEditor: false,
      showChangePassword: false
    };

    this.hideProfileEditorModal = this.hideProfileEditorModal.bind(this);
    this.showProfileEditorModal = this.showProfileEditorModal.bind(this);

    this.hideChangePasswordModal = this.hideChangePasswordModal.bind(this);
    this.showChangePasswordModal = this.showChangePasswordModal.bind(this);

    this.handleFetchNotifySuccess = this.handleFetchNotifySuccess.bind(this);
    this.handleFetchProfileSuccess = this.handleFetchProfileSuccess.bind(this);
  }

  componentDidMount() {
    this.fetchNotifications();
    this.fetchProfile();
  }

  hideProfileEditorModal() {
    this.setState({ showProfileEditor: false });
  }

  showProfileEditorModal() {
    this.setState({ showProfileEditor: true });
  }

  hideChangePasswordModal(event) {
    this.setState({ showChangePassword: false });
  }

  showChangePasswordModal() {
    this.setState({ showChangePassword: true });
  }

  async fetchNotifications() {
    await notifyServices.list(this.handleFetchNotifySuccess);
  }

  async fetchProfile() {
    const username = localStorage.getItem("username");
    await userServices.view(
      username,
      this.handleFetchProfileSuccess,
      console.log
    );
  }

  handleFetchProfileSuccess(res) {
    console.log(res);

    this.setState({ profile: res });
  }

  handleFetchNotifySuccess(res) {
    let notifications = [];

    for (var propName in res)
      if (propName.startsWith("notification_"))
        notifications.push(res[propName]);

    this.setState({ notify: notifications.reverse() });
  }

  render() {
    const unseen = this.state.notify
      ? this.state.notify.filter(n => n.seen !== "true").length
      : 0;

    return (
      <nav className="navbar navbar-white nav-fixed-top px-0">
        <span className="navbar-brand pl-4">
          <h3 className="navbar-title">Dashboard</h3>
        </span>
        <span className="form-inline pr-2 fit-content ">
          <OverlayTrigger
            rootClose
            trigger="click"
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
            trigger="focus"
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
            <Button variant="link p-0 mx-2">
              <i className="fas fa-user-circle navbar-icon" />
            </Button>
          </OverlayTrigger>
        </span>
        <AccountEditorModal
          profile={this.state.profile}
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
