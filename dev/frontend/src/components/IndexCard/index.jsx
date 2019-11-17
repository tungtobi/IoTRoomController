import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./index.css";

class IndexCard extends Component {
  state = {};
  render() {
    return (
      <div className="panel-item card p-2">
        <div className="card-body">
          <div className="row">
            <div className="col-5">
              <i className={this.props.index.icon}></i>
            </div>
            <div className="col-7 text-content">
              <a className="index-panel-title">{this.props.index.title}</a>
              <a className="index-panel-index">{this.props.index.index}</a>
            </div>
          </div>
          <div>
            <hr />
            <a onClick={() => console.log("Ckick")}>
              <i class="fas fa-redo"></i> Update now
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default IndexCard;
