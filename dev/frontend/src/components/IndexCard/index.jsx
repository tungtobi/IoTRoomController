import React, { Component } from "react";
import { Card, Button, Spinner } from "react-bootstrap";

import calcTimeUpdated from "../../logic/calcTime";

import "./index.css";

class IndexCard extends Component {
  componentDidMount() {
    this.interval = setInterval(() => {
      this.compareTime();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  compareTime() {
    if (this.props.notify === "Update now") return;

    if (this.props.timeUpdate.hours === -1) return;

    // Set value hours, minutes, seconds = -2 when "Failed to get data"
    if (this.props.timeUpdate.hours === -2) {
      this.props.changeNotify("Failed to get data");
      return;
    }

    const text = calcTimeUpdated(this.props.timeUpdate);
    this.props.changeNotify(text);
  }

  render() {
    const { index } = this.props;

    return (
      <Card className="panel-item">
        <Card.Body>
          <div className="row">
            <div className="col-3">
              <i className={index.icon}></i>
            </div>
            <div className="col-9 text-content">
              <div className="index-panel-title">{index.title}</div>
              <div className="index-panel-index">{index.index}</div>
            </div>
          </div>
        </Card.Body>
        <Card.Footer>
          {this.props.notify === "Updating..." ? (
            <Button variant="link" disabled>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                variant="primary"
              />{" "}
              Updating...
            </Button>
          ) : (
            <span>
              <Button
                variant="link"
                onClick={() => {
                  this.props.handUpdateData();
                  this.props.changeNotify("Updating...");
                }}
              >
                <i className="fas fa-redo" />
                <span> Update</span>
              </Button>
              <i className="text-muted btn float-right">
                <small>{this.props.notify}</small>
              </i>
            </span>
          )}
        </Card.Footer>
      </Card>
    );
  }
}

export default IndexCard;
