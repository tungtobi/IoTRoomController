import React, { Component } from "react";
import { Button, OverlayTrigger, Popover, Badge } from "react-bootstrap";
import "./index.css";
import AccountEditorModal from "../AccountEditorModal";
import Notification from "../Notification";
import MyAccountDropdownMenu from "../MyAccountDropdownMenu";
import { Redirect } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noti: 1,
      showProfileEditor: false,
      isLogout: false
    };

    this.handleLogout = this.handleLogout.bind(this);
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

  handleLogout() {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://54.237.117.36:3000/logout";

    fetch(proxyurl + url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: localStorage.getItem("token")
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);

        if (data.error_code === 0) {
          this.setState({ isLogout: true });
        }
      })
      .catch(console.log);
  }

  render() {
    if (this.state.isLogout === true) {
      localStorage.clear();
      return <Redirect to="/" />;
    }
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
              <Popover className="myaccount-panel">
                <MyAccountDropdownMenu
                  handleLogout={this.handleLogout}
                  showProfileEditorModal={this.showProfileEditorModal}
                />
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
