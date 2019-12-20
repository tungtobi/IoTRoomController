import React, { Component } from "react";

import ChartsPanel from "../ChartsPanel";
import IndexesPanel from "../IndexesPanel";

import "./index.css";

class RoomStatus extends Component {
  render() {
    return (
      <div className="p-4">
        <IndexesPanel
          data={this.props.indexes}
          timeUpdate={this.props.timeUpdate}
          handUpdateData={this.props.handUpdateData}
        />
        <ChartsPanel data={this.props.chart} />
      </div>
    );
  }
}

export default RoomStatus;
