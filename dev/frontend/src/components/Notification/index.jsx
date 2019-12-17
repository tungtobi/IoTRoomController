import React, { Component } from "react";
import "./style.css";
import { Row, Image, Popover, Button } from "react-bootstrap";

const MAX_CONTENT_LENGTH = 35;

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: props.list
    };
  }

  handleSelect(key) {
    const newList = this.state.list.map((notify, idx) => {
      if (idx === key) notify.seen = !notify.seen;
      return notify;
    });

    this.setState({
      list: newList
    });
  }

  markAllAsRead() {
    const newList = this.state.list.map(notify => {
      notify.seen = true;
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
                "notify-item " + (notify.seen === false ? "" : "readed")
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
                  <h5>Something for {notify.for_user}</h5>
                  <div>
                    {notify.message.length > MAX_CONTENT_LENGTH
                      ? notify.message.substring(
                          0,
                          notify.seen === true
                            ? MAX_CONTENT_LENGTH + 2
                            : MAX_CONTENT_LENGTH + 1
                        ) + "..."
                      : notify.message}
                  </div>
                  <i className="text-muted">{notify.time}</i>
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
