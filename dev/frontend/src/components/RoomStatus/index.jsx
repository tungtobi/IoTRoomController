import React, { Component } from "react";
import ChartsPanel from "../ChartsPanel/index";
import IndexesPanel from "../IndexesPanel/index";
import "./index.css";
class RoomStatus extends Component {
  state = {};
  render() {
    return (
      <div>
        <IndexesPanel></IndexesPanel>
        <ChartsPanel
          roomStatusLabels={this.props.roomStatusLabels}
          roomStatusData={this.props.roomStatusData}
        ></ChartsPanel>
      </div>
    );
  }
}

export default RoomStatus;
