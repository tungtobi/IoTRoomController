import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import "./index.css";

class IndexCard extends Component {
  state = {
    compareTime: "Update now"
  };
  compareTime() {
    var currentSeconds = new Date().getSeconds(); //Current Seconds
    var currentMinutes = new Date().getMinutes(); //Current Minutes
    var currentHours = new Date().getHours(); //Current Hours
    if (currentHours > this.props.timeUpdate.hours) {
    } else if (currentMinutes > this.props.timeUpdate.minutes) {
    } else if (currentSeconds > this.props.timeUpdate.seconds) {
      var deltaTime = (
        currentSeconds - this.props.timeUpdate.seconds
      ).toString();
      var text = "Updated " + deltaTime + "ago";
      this.setState({
        compareTime: text
      });
    }
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
          {/* <hr /> */}
          <Button variant="link" onClick={() => this.props.handUpdateData()}>
            <i className="fas fa-redo" /> {this.state.compareTime}
          </Button>
        </Card.Footer>
      </Card>
    );
  }
}

export default IndexCard;
