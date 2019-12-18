import React, { Component } from "react";
import Card from "react-bootstrap/Card";

import {
  Button,
  Table,
  Spinner,
  Alert,
  FormCheck,
  ButtonGroup
} from "react-bootstrap";
import * as userServices from "../../services/user";
import CenteredAlert from "../CenteredAlert";
import AccountEditorModal from "../AccountEditorModal";
import AccountAdditionModal from "../AccountAdditionModal";
import ChangePasswordModal from "../ChangePasswordModal";

class AccountsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: props.list,
      fetchSuccess: props.fetchSuccess,

      username: null,
      locking_state: null,

      alert: {
        action: null,
        show: false,
        title: null,
        body: null
      },

      showEditor: false,
      showAddition: false,
      showPassword: false
    };

    this.showAccountEditorModal = this.showAccountEditorModal.bind(this);
    this.hideAccountEditorModal = this.hideAccountEditorModal.bind(this);

    this.hideAccountAdditionModal = this.hideAccountAdditionModal.bind(this);
    this.showAccountAdditionModal = this.showAccountAdditionModal.bind(this);

    this.hideChangePasswordModal = this.hideChangePasswordModal.bind(this);

    this.handleAddUserSuccess = this.handleAddUserSuccess.bind(this);

    this.lockSuccess = this.handleLockUserSuccess.bind(this);
    this.unlockSuccess = this.handleUnlockUserSuccess.bind(this);
    this.fetchLockingState = this.fetchLockingState.bind(this);

    this.handleDeleteUserSuccess = this.handleDeleteUserSuccess.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);

    this.handleModifyUserSuccess = this.handleModifyUserSuccess.bind(this);

    this.onFailure = this.handleUpdateUserFailure.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.list)
      return {
        list: nextProps.list,
        fetchSuccess: nextProps.fetchSuccess
      };

    return null;
  }

  handleClickRemove(idx) {
    const { username } = this.state.list[idx];

    this.setState({
      username,
      alert: {
        action: "delete",
        show: true,
        title: `Delete Account`,
        body: (
          <div>
            Do you sure want to delete account <strong>{username}</strong>. This
            action cannot undo!
          </div>
        )
      }
    });
  }

  // Fetch from server
  async deleteAccount() {
    const { username } = this.state;

    await userServices.remove(
      username,
      this.handleDeleteUserSuccess,
      console.log
    );

    this.setState({ alert: { show: false } });
  }

  handleDeleteUserSuccess(res, req) {
    this.setState(prevState => ({
      list: prevState.list.filter(user => user.username !== req.username)
    }));
  }

  handleAddUserSuccess(res, req) {
    const newUser = { ...req, locking_state: "unlock", role: "standard" };

    let { list } = this.state;
    list.push(newUser);

    this.setState({
      list,
      showAddition: false
    });
  }

  // Handle when click lock/unlock button
  handleClickLock(idx) {
    const { username, locking_state } = this.state.list[idx];

    this.setState({
      username,
      locking_state,
      alert: {
        action: "lock",
        show: true,
        title: `${locking_state === "lock" ? "Unlock" : "Lock"} Account`,
        body: (
          <div>
            Do you sure want to {locking_state === "lock" ? "unlock" : "lock"}{" "}
            account <strong>{username}</strong>
          </div>
        )
      }
    });
  }

  // Fetch Locking State Post to server
  async fetchLockingState() {
    const { username, locking_state } = this.state;

    if (locking_state === "unlock")
      await userServices.lock(username, this.lockSuccess, this.onFailure);
    else
      await userServices.unlock(username, this.unlockSuccess, this.onFailure);

    this.setState({ alert: { show: false } });
  }

  // Change Locking State When Fetch Success
  handleLockUserSuccess(res, req) {
    this.changeLockingState(req.username, "lock");
  }

  handleUnlockUserSuccess(res, req) {
    this.changeLockingState(req.username, "unlock");
  }

  handleUpdateUserFailure() {
    this.setState({ fetchSuccess: false });
  }

  changeLockingState(username, state) {
    const newList = this.state.list.map(user => {
      if (user.username === username) {
        user.locking_state = state;
      }

      return user;
    });

    this.setState({ list: newList });
  }

  // Handle modify user data
  handleModifyUserSuccess(res, req) {
    const { username } = req;

    let newUser = this.state.list.find(user => user.username === username);

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
  showChangePasswordModal(idx) {
    const { username } = this.state.list[idx];

    this.setState({ username, showPassword: true });
  }

  hideChangePasswordModal() {
    this.setState({ showPassword: false });
  }

  showAccountEditorModal(idx) {
    const { username } = this.state.list[idx];

    this.setState({ username, showEditor: true });
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

  render() {
    const { fetchSuccess } = this.state;

    if (fetchSuccess === true)
      return (
        <Card>
          <Card.Title>Accounts Manager</Card.Title>
          <Card.Body>
            <Table responsive hover striped>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Username</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Address</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Active</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.list.map((item, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{item.username}</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.gender}</td>
                    <td>{item.address}</td>
                    <td>{item.email}</td>
                    <td>{item.phone_number}</td>
                    <td>
                      <FormCheck custom type="switch">
                        <FormCheck.Input
                          checked={item.locking_state === "unlock"}
                          onChange={console.log}
                        />
                        <FormCheck.Label
                          onClick={() => this.handleClickLock(idx)}
                        ></FormCheck.Label>
                      </FormCheck>
                    </td>
                    <td className="p-0">
                      <ButtonGroup>
                        <Button
                          onClick={() => this.showAccountEditorModal(idx)}
                          variant="link p-2"
                        >
                          <i className="fas fa-user" />
                        </Button>

                        <Button
                          onClick={() => this.showChangePasswordModal(idx)}
                          variant="link p-2"
                        >
                          <i className="fas fa-key" />
                        </Button>

                        <Button
                          onClick={() => this.handleClickRemove(idx)}
                          variant="link p-2"
                        >
                          <i className="fas fa-trash" />
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
          <Card.Footer className="hide-border mb-2 mt-n4">
            <Button
              variant="primary float-right"
              onClick={this.showAccountAdditionModal}
            >
              <i className="fas fa-plus" /> Add New Account
            </Button>
          </Card.Footer>

          <CenteredAlert
            show={this.state.alert.show}
            onHide={() => this.setState({ alert: { show: false } })}
            title={this.state.alert.title}
            button_name="Yes, continue!"
            danger="true"
            onSubmit={
              this.state.alert.action === "lock"
                ? this.fetchLockingState
                : this.deleteAccount
            }
          >
            {this.state.alert.body}
          </CenteredAlert>

          <AccountEditorModal
            show={this.state.showEditor}
            onHide={this.hideAccountEditorModal}
            profile={this.state.list.find(
              user => user.username === this.state.username
            )}
            onSuccess={this.handleModifyUserSuccess}
          />

          <AccountAdditionModal
            show={this.state.showAddition}
            onHide={this.hideAccountAdditionModal}
            onSuccess={this.handleAddUserSuccess}
          />

          <ChangePasswordModal
            username={this.state.username}
            show={this.state.showPassword}
            onHide={this.hideChangePasswordModal}
          />
        </Card>
      );
    else if (fetchSuccess === false)
      return (
        <Alert variant="danger">
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
            Check your connection and try again. Duis mollis, est non commodo
            luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
            Cras mattis consectetur purus sit amet fermentum.
          </p>
        </Alert>
      );
    else
      return (
        <Card>
          <Card.Title>Accounts Manager</Card.Title>
          <Card.Body>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />{" "}
            Loading
          </Card.Body>
        </Card>
      );
  }
}

export default AccountsPanel;
