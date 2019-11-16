import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DevicesManager from "../DevicesManager";
import DevicesScenario from "../DevicesScenario";
import DevicesHistory from "../DevicesHistory";
import RoomStatus from "../RoomStatus";
import "./index.css";
class RenderWindow extends Component {
  state = {};
  render() {
    return (
      <div>
        {/*
            A <Switch> looks through all its children <Route>
            elements and renders the first one whose path
            matches the current URL. Use a <Switch> any time
            you have multiple routes, but you want only one
            of them to render at a time
          */}
        <Switch>
          <Route exact path="/">
            <RoomStatus
              indexes={this.props.indexes}
              roomStatusLabels={this.props.roomStatusLabels}
              roomStatusData={this.props.roomStatusData}
            ></RoomStatus>
          </Route>
          <Route path="/devices">
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
          </Route>
          <Route path="/history">
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
          </Route>
          <Route path="/account">
            <span>Account</span>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default RenderWindow;
