import React, { Component } from "react";
import ChartsPanel from "../ChartsPanel";
import IndexesPanel from "../IndexesPanel";
import "./index.css";

class RoomStatus extends Component {
  render() {
    return (
      <div className="p-4">
        <IndexesPanel
          timeUpdate={this.props.timeUpdate}
          indexes={this.props.indexes}
          handUpdateData={this.props.handUpdateData}
        ></IndexesPanel>
        <ChartsPanel
          roomStatusLabels={this.props.roomStatusLabels}
          roomStatusData={this.props.roomStatusData}
        ></ChartsPanel>
      </div>
    );
  }
}

export default RoomStatus;
