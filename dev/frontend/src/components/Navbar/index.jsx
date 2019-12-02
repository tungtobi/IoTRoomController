import React, { Component } from "react";
import {
  Dropdown,
  Button,
  OverlayTrigger,
  Popover,
  Badge
} from "react-bootstrap";
import "./index.css";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noti: 1
    };

    this.handleClickNotifi = this.handleClickNotifi.bind(this);
  }

  handleClickNotifi() {
    this.setState({
      noti: 0
    });
  }

  render() {
    return (
      <nav className="navbar navbar-light navbar-white py-2 px-0 nav-fixed-top">
        <span className="navbar-brand pl-2-percent d-none d-md-block">
          <h3 className="navbar-title">
            Dashboard
            {/* > {this.props.nameWindow} */}
          </h3>
        </span>
        <span className="form-inline pr-1-percent fit-content ">
          <OverlayTrigger
            trigger="focus"
            placement="bottom"
            overlay={
              <Popover>
                <Popover.Title as="h3">Thông báo</Popover.Title>
                <Popover.Content>
                  <strong>Holy guacamole!</strong> Check this info.
                </Popover.Content>
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
                  <Dropdown.Item href="#/action-1">
                    Thông tin cá nhân
                  </Dropdown.Item>
                  <Dropdown.Item href="/">Đăng xuất</Dropdown.Item>
                </Popover.Content>
              </Popover>
            }
          >
            <Button variant="link">
              <i className="fas fa-user-circle navbar-icon" />
            </Button>
          </OverlayTrigger>
        </span>
      </nav>
    );
  }
}

export default Navbar;
