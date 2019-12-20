import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import RoomStatus from "../RoomStatus";
import ForecastsWindow from "../Forecasts";
import AccountsPanel from "../AccountsPanel";
import FailureAlert from "../FailureAlert";
import Loading from "../Loading";

import * as userServices from "../../services/user";
import getErrorMessage from "../../services/error";

import "./index.css";
import Unavailable from "../Unavailable";
import * as iotServices from "../../services/iot";

class RenderWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // IoT Data
      iotCurrent: null,
      iotDatas: null,
      timeUpdate: {
        seconds: 0,
        minutes: 0,
        hours: 0
      },

      // Users
      users: null,
      filtered: null,
      filter: {
        username: "",
        first_name: "",
        last_name: "",
        gender: "all",
        address: "",
        email: "",
        phone_number: "",
        role: "all",
        locking_state: "all"
      },

      // Modal/Alert show checking
      showEditor: false,
      showAddition: false,
      showPassword: false,
      showAlert: false,

      fetchIoTChartSuccess: null,
      fetchIoTCurrentSuccess: null,
      fetchUsersSuccess: null,
      process: false,
      response: null
    };

    // Fetch IoT Data callback
    this.handleFetchIoTDatasSuccess = this.handleFetchIoTDatasSuccess.bind(
      this
    );
    this.handleFetchIoTDatasFailed = this.handleFetchIoTDatasFailed.bind(this);
    this.handleFetchIoTCurrentSuccess = this.handleFetchIoTCurrentSuccess.bind(
      this
    );
    this.handleFetchIoTCurrentFailed = this.handleFetchIoTCurrentFailed.bind(
      this
    );

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

    // Sort & Filter
    this.sortBy = this.sortBy.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
  }

  componentDidMount() {
    this.fetchIoTDatas();
    this.fetchIoTCurrent();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.isAdmin && prevState.fetchUsersSuccess === null) {
      if (this.props.isAdmin === true) this.fetchUserList();
      else if (this.props.isAdmin === false) return this.handleNoFetch();
    }
  }

  // Fetch IoT Data
  async fetchIoTDatas() {
    await iotServices.chart(
      this.handleFetchIoTDatasSuccess,
      this.handleFetchIoTDatasFailed
    );
  }

  // Fetch IoT Data callback function
  handleFetchIoTDatasSuccess(data) {
    this.setState({
      iotDatas: data.result,
      fetchIoTChartSuccess: true
    });
  }

  handleFetchIoTDatasFailed(res) {
    const response = getErrorMessage(res);

    this.setState({
      fetchIoTChartSuccess: false,
      response
    });
  }

  async fetchIoTCurrent() {
    await iotServices.current(
      this.handleFetchIoTCurrentSuccess,
      this.handleFetchIoTCurrentFailed
    );
  }

  // Fetch IoT Data callback function
  handleFetchIoTCurrentSuccess(data) {
    var current = new Date();

    this.setState({
      iotCurrent: data,
      timeUpdate: {
        seconds: current.get,
        minutes: current.getMinutes,
        hours: current.getHours
      },
      fetchIoTCurrentSuccess: true
    });
  }

  handleFetchIoTCurrentFailed(res) {
    const response = getErrorMessage(res);

    this.setState({
      fetchIoTCurrentSuccess: false,
      response
    });
  }

  // Fetch user list
  async fetchUserList() {
    await userServices.list(this.handleFetchUsersSuccess, this.handleFailure);
  }

  handleNoFetch() {
    this.setState({ filtered: [], fetchUsersSuccess: true });
  }

  // List users callback function
  handleFetchUsersSuccess(res) {
    let users = [];
    for (var propName in res) {
      if (propName.startsWith("user_")) {
        if (res[propName].username !== this.props.username)
          users.push(res[propName]);
      }
    }
    this.setState({ users, filtered: users, fetchUsersSuccess: true });
  }

  handleFetchUsersFailure(res) {
    const response = getErrorMessage(res);

    this.setState({ fetchUsersSuccess: false, response });
  }

  // Change password callback function
  onChangePswdSuccess(req) {
    const { username, password } = req;

    const newList = this.state.users.map(user => {
      if (user.username === username) {
        user.password = password;
      }

      return user;
    });

    this.setState(prevState => ({
      users: newList,
      filtered: this.filter(newList, prevState.filter)
    }));
  }

  // Delete user callback function
  handleDeleteUserSuccess(res, req) {
    this.setState(prevState => ({
      users: prevState.users.filter(user => user.username !== req.username),
      filtered: this.filter(
        prevState.users.filter(user => user.username !== req.username),
        prevState.filter
      ),

      showAlert: false,
      process: false
    }));
  }

  // Add user callback function
  handleAddUserSuccess(res, req) {
    const newUser = { ...req, locking_state: "unlock" };

    let { users } = this.state;
    users.push(newUser);

    this.setState(prevState => ({
      users,
      filtered: this.filter(users, prevState.filter),
      showAddition: false
    }));
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
      if (user.username === username) user.locking_state = state;
      return user;
    });

    this.setState(prevState => ({
      users: newList,
      filtered: this.filter(newList, prevState.filter),
      showAlert: false,
      process: false
    }));
  }

  // Modify user callback function
  handleModifyUserSuccess(res, req) {
    const { username } = req;

    let newUser = this.state.users.find(user => user.username === username);

    for (var key in req)
      if (key !== "username" && key !== "token") newUser[key] = req[key];

    this.setState({ showEditor: false });

    this.updateFilter();
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

  // Filter user list
  updateFilter(name, value) {
    const { users, filter } = this.state;

    if (name) filter[name] = value;

    this.setState({ filtered: this.filter(users, filter), filter });
  }

  filter(users, filter) {
    const filtered = users.filter(
      user =>
        user.username.startsWith(filter.username) &&
        user.last_name.startsWith(filter.last_name) &&
        user.first_name.startsWith(filter.first_name) &&
        user.address.startsWith(filter.address) &&
        user.email.startsWith(filter.email) &&
        user.phone_number.startsWith(filter.phone_number) &&
        (user.gender === filter.gender || filter.gender === "all") &&
        (user.role === filter.role || filter.role === "all") &&
        (user.locking_state === filter.locking_state ||
          filter.locking_state === "all")
    );

    return filtered;
  }

  // Sort user list by property
  sortBy(property, direct) {
    let sorted;

    if (direct === "up")
      sorted = [...this.state.users].sort((a, b) =>
        a[property] < b[property] ? 1 : b[property] < a[property] ? -1 : 0
      );
    else if (direct === "down")
      sorted = [...this.state.users].sort((a, b) =>
        a[property] > b[property] ? 1 : b[property] > a[property] ? -1 : 0
      );

    this.setState(prevState => ({
      users: sorted,
      filtered: this.filter(sorted, prevState.filter)
    }));
  }

  render() {
    const fetchSuccess =
      this.props.fetchProfileSuccess &&
      this.state.fetchUsersSuccess &&
      this.state.fetchIoTChartSuccess &&
      this.state.fetchIoTCurrentSuccess;

    if (fetchSuccess === true)
      return (
        <div className="window-body">
          <Switch>
            <Route exact path="/dashboard">
              <RoomStatus
                chart={this.state.iotDatas}
                indexes={this.state.iotCurrent}
                timeUpdate={this.state.timeUpdate}
                handUpdateData={() => this.fetchIoTCurrent()}
              ></RoomStatus>
            </Route>
            <Route path="/dashboard/accounts">
              {!this.props.isAdmin ? (
                <Redirect to="/" />
              ) : (
                <div className="p-4">
                  <AccountsPanel
                    allow={this.props.isAdmin}
                    list={this.state.filtered.filter(
                      user => user.username !== this.props.username
                    )}
                    response={this.state.response}
                    process={() => this.process()}
                    isProcess={this.state.process}
                    sort={this.sortBy}
                    filter={this.updateFilter}
                    default={this.state.filter}
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
                </div>
              )}
            </Route>
            <Route path="/dashboard/forecasts">
              <ForecastsWindow />
            </Route>
            <Route path="/dashboard/remotes">
              <Unavailable />
            </Route>
          </Switch>
        </div>
      );
    else if (fetchSuccess === false) {
      const message = this.props.response && this.state.response;
      return <FailureAlert message={message} />;
    } else return <Loading />;
  }
}

export default RenderWindow;
