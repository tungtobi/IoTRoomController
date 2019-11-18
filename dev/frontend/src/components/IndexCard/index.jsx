import React, { Component } from "react";
// import { Button } from "react-bootstrap";
import "./index.css";

class IndexCard extends Component {
  state = {};
  render() {
    return (
      <div className="panel-item card p-2">
        <div className="card-body">
          <div className="row">
            <div className="col-3">
              <i className={this.props.index.icon}></i>
            </div>
            <div className="col-9 text-content">
              <div className="index-panel-title">{this.props.index.title}</div>
              <div className="index-panel-index">{this.props.index.index}</div>
            </div>
          </div>
          <div>
            <hr />
            <div onClick={() => console.log("Ckick")}>
              <i className="fas fa-redo"></i> Update now
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default IndexCard;
