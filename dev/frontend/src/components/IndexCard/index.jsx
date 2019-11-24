import React, { Component } from "react";
import { Card } from "react-bootstrap";
import "./index.css";

class IndexCard extends Component {
  state = {};
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
          <a href="#update" onClick={() => console.log("Ckick")}>
            <i className="fas fa-redo" /> Update now
          </a>
        </Card.Footer>
      </Card>
    );
  }
}

export default IndexCard;
