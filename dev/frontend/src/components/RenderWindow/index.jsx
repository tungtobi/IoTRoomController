import React, { Component } from "react";
import DevicesManager from "../DevicesManager";
import DevicesScenario from "../DevicesScenario";
import DevicesHistory from "../DevicesHistory";
import RoomStatus from "../RoomStatus";
import "./index.css";
class RenderWindow extends Component {
  state = {};
  render() {
    if (this.props.nameWindow === "Room Status") {
      return (
        <RoomStatus
          indexes={this.props.indexes}
          roomStatusLabels={this.props.roomStatusLabels}
          roomStatusData={this.props.roomStatusData}
        ></RoomStatus>
      );
    } else if (this.props.nameWindow === "Devices") {
      return (
        <div className="p-4 devices">
          <span className="card">
            <h5 className="card-title m-2">Devices Manager</h5>
            <DevicesManager
              devicesList={this.props.devicesList}
              removeDevice={this.props.removeDeviceList}
            ></DevicesManager>
          </span>
          <span className="card mt-4">
            <h5 className="card-title m-2">Devices Scenario</h5>
            <DevicesScenario
              devicesScenario={this.props.devicesScenario}
              removeDevice={this.props.removeDeviceScenario}
            ></DevicesScenario>
          </span>
        </div>
      );
    } else if (this.props.nameWindow === "History") {
      return (
        <div className="p-4 devices">
          {this.props.devicesHistory.map(item => (
            <span className="card mb-4">
              <h5 className="card-title m-2">{item.date}</h5>
              <DevicesHistory
                histories={item.histories}
                removeDevice={this.props.removeDeviceHistory}
              ></DevicesHistory>
            </span>
          ))}
        </div>
      );
    } else if (this.props.nameWindow === "Account") {
      return <span>Account</span>;
    }
  }
}

export default RenderWindow;
