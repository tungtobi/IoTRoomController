import React, { Component } from "react";
import ChartsPanel from "../ChartsPanel";
import IndexesPanel from "../IndexesPanel";
import "./index.css";
class RoomStatus extends Component {
  state = {};
  render() {
    return (
      <div>
        <IndexesPanel indexes={this.props.indexes}></IndexesPanel>
        <ChartsPanel
          roomStatusLabels={this.props.roomStatusLabels}
          roomStatusData={this.props.roomStatusData}
        ></ChartsPanel>
      </div>
    );
  }
}

export default RoomStatus;
