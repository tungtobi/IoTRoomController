import React, { Component } from "react";
import "./style.css";
import { Row, Image, Popover, Button } from "react-bootstrap";
import { getDate } from "../../logic/forecast";
import logo from "../../img/logo.png";

const MAX_CONTENT_LENGTH = 33;

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: props.list
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      list: nextProps.list
    };
  }

  render() {
    const { list } = this.state;

    return (
      <React.Fragment>
        <Popover.Title>
          <span className="popover-title-text">Notification</span>
          <Button
            variant="link p-0"
            className="popover-title-button"
            onClick={this.props.markAllAsRead}
          >
            Mark all as read
          </Button>
        </Popover.Title>
        <Popover.Content className="p-0">
          <div className="notify-scroll-list">
            {!list ? (
              <div className="myaccount-menu-item">
                Fail to fetch notification!
              </div>
            ) : list.length === 0 ? (
              <div className="myaccount-menu-item">
                You don't have any notification!
              </div>
            ) : (
              list.map((notify, idx) => (
                <div
                  key={idx}
                  className={
                    "notify-item" + (notify.seen === "true" ? " readed" : "")
                  }
                  onClick={() => this.props.handleSelect(idx)}
                >
                  <Row>
                    <div className="notify-thumbnail-container">
                      <Image
                        roundedCircle
                        className="notify-thumbnail"
                        src={logo}
                      />
                    </div>
                    <div className="notify-text-container">
                      <h5>{notify.title}</h5>
                      <div>
                        {notify.message.length > MAX_CONTENT_LENGTH
                          ? notify.message.substring(
                              0,
                              notify.seen === true
                                ? MAX_CONTENT_LENGTH
                                : MAX_CONTENT_LENGTH
                            ) + "..."
                          : notify.message}
                      </div>
                      <i className="text-muted">{getDate(notify.time)}</i>
                    </div>
                  </Row>
                </div>
              ))
            )}
          </div>
          <div className="popover-footer">
            <Button variant="link p-0">See All</Button>
          </div>
        </Popover.Content>
      </React.Fragment>
    );
  }
}

export default Notification;
