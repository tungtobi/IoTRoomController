import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import RoomStatus from "../RoomStatus";
import Devices from "../Devices";
import HistoryCard from "../HistoryCard";
import "./index.css";
import ForecastsWindow from "../Forecasts";
import AccountsPanel from "../AccountsPanel";
import FailureAlert from "../FailureAlert";

import * as userServices from "../../services/user";
import getErrorMessage from "../../services/error";
import Loading from "../Loading";

class RenderWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchUsersSuccess: null,
      users: null,

      showEditor: false,
      showAddition: false,
      showPassword: false,
      showAlert: false,

      process: false,

      response: null
    };

    // List users callback
    this.handleFetchUsersSuccess = this.handleFetchUsersSuccess.bind(this);
    this.handleFailure = this.handleFetchUsersFailure.bind(this);

    // Add user callback
    this.handleAddUserSuccess = this.handleAddUserSuccess.bind(this);

    // Lock/Unlock user callback
    this.handleLockUserSuccess = this.handleLockUserSuccess.bind(this);
    this.handleUnlockUserSuccess = this.handleUnlockUserSuccess.bind(this);
    this.changeLockingState = this.changeLockingState.bind(this);

    // Delete user callback
    this.handleDeleteUserSuccess = this.handleDeleteUserSuccess.bind(this);

    // Modify user callback
    this.handleModifyUserSuccess = this.handleModifyUserSuccess.bind(this);

    this.fetchUserList = this.fetchUserList.bind(this);

    // Modal handler
    this.showAccountEditorModal = this.showAccountEditorModal.bind(this);
    this.hideAccountEditorModal = this.hideAccountEditorModal.bind(this);

    this.hideAccountAdditionModal = this.hideAccountAdditionModal.bind(this);
    this.showAccountAdditionModal = this.showAccountAdditionModal.bind(this);

    this.showChangePasswordModal = this.showChangePasswordModal.bind(this);
    this.hideChangePasswordModal = this.hideChangePasswordModal.bind(this);

    // Sort
    this.sortBy = this.sortBy.bind(this);
  }

  componentDidMount() {
    this.fetchUserList();
  }

  // Fetch user list
  async fetchUserList() {
    await userServices.list(this.handleFetchUsersSuccess, this.handleFailure);
  }

  // List users callback function
  handleFetchUsersSuccess(res) {
    let users = [];
    for (var propName in res) {
      if (propName.startsWith("user_")) {
        if (res[propName].role !== "admin") users.push(res[propName]);
      }
    }
    this.setState({ users, fetchUsersSuccess: true });
  }

  handleFetchUsersFailure(res) {
    let response = "Time out";

    if (res) response = getErrorMessage(res.error_code);

    this.setState({ fetchUsersSuccess: false, response });
  }

  // Delete user callback function
  handleDeleteUserSuccess(res, req) {
    this.setState(prevState => ({
      users: prevState.users.filter(user => user.username !== req.username),
      showAlert: false,
      process: false
    }));
  }

  // Add user callback function
  handleAddUserSuccess(res, req) {
    const newUser = { ...req, locking_state: "unlock", role: "standard" };

    let { users } = this.state;
    users.push(newUser);

    this.setState({
      users,
      showAddition: false
    });
  }

  // Change Locking State callback function
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

    this.setState({ users: newList, showAlert: false, process: false });
  }

  // Modify user callback function
  handleModifyUserSuccess(res, req) {
    const { username } = req;

    let newUser = this.state.users.find(user => user.username === username);

    for (var key in req) {
      if (key !== "username" && key !== "token") {
        newUser[key] = req[key];
      }
    }

    this.setState({
      showEditor: false
    });
  }

  // Modals
  showChangePasswordModal() {
    this.setState({ showPassword: true });
  }

  hideChangePasswordModal() {
    this.setState({ showPassword: false });
  }

  showAccountEditorModal() {
    this.setState({ showEditor: true });
  }

  hideAccountEditorModal() {
    this.setState({ showEditor: false });
  }

  showAccountAdditionModal() {
    this.setState({ showAddition: true });
  }

  hideAccountAdditionModal() {
    this.setState({ showAddition: false });
  }

  showAlert() {
    this.setState({ showAlert: true });
  }

  hideAlert() {
    this.setState({ showAlert: false });
  }

  process() {
    this.setState({ process: true });
  }

  // Sort user list by property
  sortBy(property, direct) {
    let sorted;

    if (direct === "up")
      sorted = [...this.state.users].sort((a, b) =>
        a[property] < b[property] ? 1 : b[property] < a[property] ? -1 : 0
      );
    else
      sorted = [...this.state.users].sort((a, b) =>
        a[property] > b[property] ? 1 : b[property] > a[property] ? -1 : 0
      );

    this.setState(prev => ({
      users: sorted
    }));
  }

  render() {
    const { fetchUsersSuccess } = this.state;

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
            <div className="p-4">
              {fetchUsersSuccess === true ? (
                <AccountsPanel
                  list={this.state.users}
                  response={this.state.response}
                  process={() => this.process()}
                  isProcess={this.state.process}
                  sort={this.sortBy}
                  callback={{
                    onAddSuccess: this.handleAddUserSuccess,
                    onModifySuccess: this.handleModifyUserSuccess,
                    onDeleteSuccess: this.handleDeleteUserSuccess,
                    onLockSuccess: this.handleLockUserSuccess,
                    onUnlockSuccess: this.handleUnlockUserSuccess,
                    onFailure: this.handleFailure
                  }}
                  show={{
                    edit: this.showAccountEditorModal,
                    add: this.showAccountAdditionModal,
                    changePswd: this.showChangePasswordModal,
                    alert: () => this.showAlert()
                  }}
                  hide={{
                    edit: this.hideAccountEditorModal,
                    add: this.hideAccountAdditionModal,
                    changePswd: this.hideChangePasswordModal,
                    alert: () => this.hideAlert()
                  }}
                  visible={{
                    edit: this.state.showEditor,
                    add: this.state.showAddition,
                    changePswd: this.state.showPassword,
                    alert: this.state.showAlert
                  }}
                />
              ) : fetchUsersSuccess === false ? (
                <FailureAlert message={this.state.response} />
              ) : (
                <Loading />
              )}
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
