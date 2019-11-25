import React, { Component } from "react";
import IndexCard from "../IndexCard";
import "./index.css";

class IndexesPanel extends Component {
  render() {
    return (
      <div>
        <div className="panel">
          {this.props.indexes.map((item, idx) => (
            <IndexCard
              key={idx}
              index={item}
              timeUpdate={this.props.timeUpdate}
              handUpdateData={this.props.handUpdateData}
            ></IndexCard>
          ))}
        </div>
      </div>
    );
  }
}

export default IndexesPanel;
