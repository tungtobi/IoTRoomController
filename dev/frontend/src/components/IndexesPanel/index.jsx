import React, { Component } from "react";
import IndexCard from "../IndexCard";
import "./index.css";

class IndexesPanel extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className="panel">
          {this.props.indexes.map((item, idx) => (
            <IndexCard key={idx} index={item}></IndexCard>
          ))}
        </div>
      </div>
    );
  }
}

export default IndexesPanel;
