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
      notify: null,
      showProfileEditor: false,
      showChangePassword: false,
      showFailAlert: false,
      response: null
    };

    this.hideProfileEditorModal = this.hideProfileEditorModal.bind(this);
    this.showProfileEditorModal = this.showProfileEditorModal.bind(this);

    this.hideChangePasswordModal = this.hideChangePasswordModal.bind(this);
    this.showChangePasswordModal = this.showChangePasswordModal.bind(this);

    this.handleFetchNotifySuccess = this.handleFetchNotifySuccess.bind(this);

    this.handleModifyProfileSuccess = this.handleModifyProfileSuccess.bind(
      this
    );
  }

  componentDidMount() {
    this.fetchNotifications();
  }

  hideProfileEditorModal() {
    this.setState({ showProfileEditor: false });
  }

  showProfileEditorModal() {
    this.refs.profileOverlay.hide();
    if (this.props.profile) this.setState({ showProfileEditor: true });
  }

  hideChangePasswordModal() {
    this.setState({ showChangePassword: false });
  }

  showChangePasswordModal() {
    this.refs.profileOverlay.hide();
    if (this.props.profile) this.setState({ showChangePassword: true });
  }

  showFailureAlert() {
    this.setState({ showFailAlert: true });
  }

  hideFailureAlert() {
    this.setState({ showFailAlert: false });
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

  handleModifyProfileSuccess(res, req) {
    const { profile } = this.state;

    for (var key in req) {
      if (key !== "username" && key !== "token") {
        profile[key] = req[key];
      }
    }

    this.setState({
      showProfileEditor: false
    });
  }

  render() {
    const unseen = this.state.notify
      ? this.state.notify.filter(n => n.seen !== "true").length
      : 0;

    const { username } = this.props.profile ? this.props.profile : {};

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
            rootClose
            trigger="click"
            ref="profileOverlay"
            placement="bottom"
            overlay={
              <Popover className="myaccount-panel">
                <MyAccountDropdownMenu
                  username={username}
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
          self
          profile={this.props.profile}
          show={this.state.showProfileEditor}
          onHide={this.hideProfileEditorModal}
          onSuccess={this.handleModifyProfileSuccess}
        />
        <ChangePasswordModal
          self
          prev={this.props.profile}
          show={this.state.showChangePassword}
          onHide={this.hideChangePasswordModal}
        />
      </nav>
    );
  }
}

export default Navbar;
