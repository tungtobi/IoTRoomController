import React, { Component } from "react";
import {
  Dropdown,
  Button,
  OverlayTrigger,
  Popover,
  Badge
} from "react-bootstrap";
import "./index.css";
import AccountEditorModal from "../AccountEditorModal";
import Notification from "../Notification";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noti: 1,
      showProfileEditor: false
    };

    this.handleClickNotifi = this.handleClickNotifi.bind(this);
    this.handleClickAccount = this.handleClickAccount.bind(this);
    this.hideProfileEditorModal = this.hideProfileEditorModal.bind(this);
    this.showProfileEditorModal = this.showProfileEditorModal.bind(this);
  }

  hideProfileEditorModal() {
    this.setState({
      showProfileEditor: false
    });
  }

  showProfileEditorModal() {
    this.setState({ showProfileEditor: true });
  }

  handleClickNotifi() {
    this.setState({
      noti: 0
    });
  }

  handleClickAccount() {
    this.refs.overlay.hide();
  }

  render() {
    return (
      <nav className="navbar navbar-light navbar-white py-2 px-0 nav-fixed-top">
        <span className="navbar-brand pl-2-percent">
          <h3 className="navbar-title">Dashboard</h3>
        </span>
        <span className="form-inline pr-1-percent fit-content ">
          <OverlayTrigger
            trigger="click"
            ref="overlay"
            placement="bottom"
            overlay={
              <Popover className="notify-panel">
                <Notification />
              </Popover>
            }
          >
            <Button variant="link p-0" onClick={this.handleClickNotifi}>
              {this.state.noti !== 0 && (
                <Badge pill variant="danger notification px-1">
                  {this.state.noti}
                </Badge>
              )}
              <i className="fas fa-bell navbar-icon" />
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            trigger="focus"
            placement="bottom"
            overlay={
              <Popover>
                <Popover.Content className="py-2 px-0">
                  <Dropdown.Item onClick={this.showProfileEditorModal}>
                    Your Profile
                  </Dropdown.Item>
                  <Dropdown.Item href="/">Logout!</Dropdown.Item>
                </Popover.Content>
              </Popover>
            }
          >
            <Button variant="link p-0 mx-2" onClick={this.handleClickAccount}>
              <i className="fas fa-user-circle navbar-icon" />
            </Button>
          </OverlayTrigger>
        </span>
        <AccountEditorModal
          show={this.state.showProfileEditor}
          onHide={this.hideProfileEditorModal}
        />
      </nav>
    );
  }
}

export default Navbar;
