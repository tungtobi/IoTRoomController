import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import RoomStatus from "../RoomStatus";
import Devices from "../Devices";
import HistoryCard from "../HistoryCard";
import "./index.css";
import ForecastsWindow from "../Forecasts";
import AccountsPanel from "../AccountsPanel";

class RenderWindow extends Component {
  render() {
    return (
      <div className="window-body">
        {/*
            A <Switch> looks through all its children <Route>
            elements and renders the first one whose path
            matches the current URL. Use a <Switch> any time
            you have multiple routes, but you want only one
            of them to render at a time
          */}
        <Switch>
          <Route exact path="/dashboard">
            <RoomStatus
              indexes={this.props.indexes}
              timeUpdate={this.props.timeUpdate}
              roomStatusLabels={this.props.roomStatusLabels}
              roomStatusData={this.props.roomStatusData}
              handUpdateData={this.props.handUpdateData}
            ></RoomStatus>
          </Route>
          <Route path="/dashboard/devices">
            <Devices
              devicesList={this.props.devicesList}
              removeDeviceList={this.props.removeDeviceList}
              devicesScenario={this.props.devicesScenario}
              removeDeviceScenario={this.props.removeDeviceScenario}
              showDevEditModal={this.props.showDevEditModal}
              showDevAddModal={this.props.showDevAddModal}
            />
          </Route>
          <Route path="/dashboard/history">
            <HistoryCard devicesHistory={this.props.devicesHistory} />
          </Route>
          <Route path="/dashboard/accounts">
            <div className="p-4 devices">
              <AccountsPanel accounts={this.props.accounts}></AccountsPanel>
            </div>
          </Route>
          <Route path="/dashboard/forecasts">
            <ForecastsWindow />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default RenderWindow;
