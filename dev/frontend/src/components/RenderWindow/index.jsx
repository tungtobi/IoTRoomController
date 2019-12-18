import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import RoomStatus from "../RoomStatus";
import Devices from "../Devices";
import HistoryCard from "../HistoryCard";
import "./index.css";
import ForecastsWindow from "../Forecasts";
import AccountsPanel from "../AccountsPanel";
import * as userServices from "../../services/user";

class RenderWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchUsersSuccess: null,
      users: null
    };

    this.handleFetchUsersSuccess = this.handleFetchUsersSuccess.bind(this);
    this.handleFetchUsersFailure = this.handleFetchUsersFailure.bind(this);

    this.handleLockUserSuccess = this.handleLockUserSuccess.bind(this);
    this.handleUnlockUserSuccess = this.handleUnlockUserSuccess.bind(this);
  }

  componentDidMount() {
    this.fetchUserList();
  }

  async fetchUserList() {
    await userServices.list(
      this.handleFetchUsersSuccess,
      this.handleFetchUsersFailure
    );
  }

  handleFetchUsersSuccess(res) {
    let users = [];
    for (var propName in res) {
      if (propName.startsWith("user_")) {
        if (res[propName].role !== "admin") users.push(res[propName]);
      }
    }
    this.setState({ users, fetchUsersSuccess: true });
  }

  handleFetchUsersFailure() {
    this.setState({ fetchUsersSuccess: false });
  }

  handleLockUserSuccess(res, req) {
    this.changeLockingState(req.username, "lock");
  }

  handleUnlockUserSuccess(res, req) {
    this.changeLockingState(req.username, "unlock");
  }

  changeLockingState(username, state) {
    const newList = this.state.users.map(user => {
      if (user.username === username) {
        user.locking_state = state;
      }

      return user;
    });

    this.setState({ list: newList });
  }

  render() {
    return (
      <div className="window-body">
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
              <AccountsPanel
                list={this.state.users}
                fetchSuccess={this.state.fetchUsersSuccess}
                lockSuccess={this.handleLockUserSuccess}
                unlockSuccess={this.handleUnlockUserSuccess}
              />
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
