import React, { Component } from "react";
import "./style.css";
import { Col, Row, Image, Popover, Button } from "react-bootstrap";

const MAX_CONTENT_LENGTH = 35;

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          title: "Hello World",
          content: "Welcome to dashboard, this is a simple notification.",
          timestamp: "16/12/2019",
          readed: false
        },
        {
          title: "Another Notification",
          content: "Just another notify to see what going on.",
          timestamp: "15/12/2019",
          readed: true
        }
      ]
    };
  }

  handleSelect(key) {
    const newList = this.state.list.map((notify, idx) => {
      if (idx === key) notify.readed = !notify.readed;

      return notify;
    });
    this.setState({
      list: newList
    });
  }

  markAllAsRead() {
    const newList = this.state.list.map(notify => {
      notify.readed = true;
      return notify;
    });
    this.setState({
      list: newList
    });
  }

  render() {
    return (
      <React.Fragment>
        <Popover.Title>
          <span className="popover-title-text">Notification</span>
          <Button
            variant="link p-0"
            className="popover-title-button"
            onClick={() => this.markAllAsRead()}
          >
            Mark all as read
          </Button>
        </Popover.Title>
        <Popover.Content className="p-0">
          {this.state.list.map((notify, idx) => (
            <div
              key={idx}
              className={
                "notify-item " + (notify.readed === true ? "readed" : "")
              }
              onClick={() => this.handleSelect(idx)}
            >
              <Row>
                <div className="notify-thumbnail-container">
                  <Image
                    roundedCircle
                    className="notify-thumbnail"
                    src="https://yt3.ggpht.com/a/AGF-l7-rOqnsoRaW8LTM75Y2vuElIySnOe18OPUNnA=s900-c-k-c0xffffffff-no-rj-mo"
                  />
                </div>
                <div className="notify-text-container">
                  <h5>{notify.title}</h5>
                  <div>
                    {notify.content.length > MAX_CONTENT_LENGTH
                      ? notify.content.substring(0, MAX_CONTENT_LENGTH) + "..."
                      : notify.content}
                  </div>
                  <i className="text-muted">{notify.timestamp}</i>
                </div>
              </Row>
            </div>
          ))}
          <div className="popover-footer">
            <Button variant="link p-0">See All</Button>
          </div>
        </Popover.Content>
      </React.Fragment>
    );
  }
}

export default Notification;
