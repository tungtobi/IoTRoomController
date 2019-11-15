import React, { Component } from "react";

class IndexCard extends Component {
  state = {};
  render() {
    return (
      <div className="panel-item card p-2">
        <span className="float-left">
          <i className={this.props.index.icon}></i>
          <a className="px-xl-2 index-panel-title pt-3 pr-3">
            {this.props.index.title}
          </a>
          <a className="index-panel-index pr-3">{this.props.index.index}</a>
        </span>
      </div>
    );
  }
}

export default IndexCard;
