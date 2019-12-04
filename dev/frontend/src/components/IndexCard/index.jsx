import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import "./index.css";

class IndexCard extends Component {
  state = {
    compareTime: "Update now"
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.compareTime();
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  compareTime() {
    var currentSeconds = new Date().getSeconds(); //Current Seconds
    var currentMinutes = new Date().getMinutes(); //Current Minutes
    var currentHours = new Date().getHours(); //Current Hours

    var deltaHour = currentHours - this.props.timeUpdate.hours;
    var deltaMinutes = currentMinutes - this.props.timeUpdate.minutes;
    var deltaSecond = currentSeconds - this.props.timeUpdate.seconds;

    var deltaTime = deltaHour * 3600 + deltaMinutes * 60 + deltaSecond;
    var text = "";

    if (deltaTime >= 7200) {
      text =
        "Last updated " +
        Math.floor(deltaTime / 3600).toString() +
        " hours ago";
    } else if (deltaTime >= 3600) {
      text =
        "Last updated " + Math.floor(deltaTime / 3600).toString() + " hour ago";
    } else if (deltaTime >= 120) {
      text =
        "Last updated " +
        Math.floor(deltaTime / 60).toString() +
        " minutes ago";
    } else if (deltaTime >= 60) {
      text =
        "Last updated " + Math.floor(deltaTime / 60).toString() + " minute ago";
    } else {
      text = "Last updated a few seconds ago";
    }
    this.setState({
      compareTime: text
    });
  }

  render() {
    return (
      <Card className="panel-item p-2">
        <Card.Body>
          <div className="row">
            <div className="col-3">
              <i className={this.props.index.icon}></i>
            </div>
            <div className="col-9 text-content">
              <div className="index-panel-title">{this.props.index.title}</div>
              <div className="index-panel-index">{this.props.index.index}</div>
            </div>
          </div>
        </Card.Body>
        <Card.Footer>
          <Button variant="link" onClick={() => this.props.handUpdateData()}>
            <i className="fas fa-redo" />
            <span> Update</span>
          </Button>
          <small className="text-muted btn float-right">
            {this.state.compareTime}
          </small>
        </Card.Footer>
      </Card>
    );
  }
}

export default IndexCard;
