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
      username: null,
      locking_state: null,

      alert: {
        action: null,
        show: false,
        title: null,
        body: null
      }
    };

    // Fetch from server
    this.fetchLockingState = this.fetchLockingState.bind(this);
    this.fetchDeleteAccount = this.fetchDeleteAccount.bind(this);
  }

  // Handle click button
  handleClickRemove(idx) {
    const { username } = this.props.list[idx];

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

  handleClickLock(idx) {
    const { username, locking_state } = this.props.list[idx];

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

  handleClickProfile(idx) {
    const { username } = this.props.list[idx];

    this.setState({ username });

    this.props.show.edit();
  }

  handleClickPassword(idx) {
    const { username } = this.props.list[idx];

    this.setState({ username });

    this.props.show.changePswd();
  }

  // Fetch from server
  async fetchDeleteAccount() {
    const { username } = this.state;

    await userServices.remove(
      username,
      this.props.callback.onDeleteSuccess,
      this.props.callback.onFailure
    );

    this.setState({ alert: { show: false } });
  }

  async fetchLockingState() {
    const { username, locking_state } = this.state;

    if (locking_state === "unlock")
      await userServices.lock(
        username,
        this.props.callback.onLockSuccess,
        this.props.callback.onFailure
      );
    else
      await userServices.unlock(
        username,
        this.props.callback.onUnlockSuccess,
        this.props.callback.onFailure
      );

    this.setState({ alert: { show: false } });
  }

  render() {
    const { fetchSuccess } = this.props;

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
                {this.props.list.map((item, idx) => (
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
                          onClick={() => this.handleClickProfile(idx)}
                          variant="link p-2"
                        >
                          <i className="fas fa-user" />
                        </Button>

                        <Button
                          onClick={() => this.handleClickPassword(idx)}
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
            <Button variant="primary float-right" onClick={this.props.show.add}>
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
                : this.fetchDeleteAccount
            }
          >
            {this.state.alert.body}
          </CenteredAlert>

          <AccountEditorModal
            show={this.props.visible.edit}
            onHide={this.props.hide.edit}
            profile={this.props.list.find(
              user => user.username === this.state.username
            )}
            onSuccess={this.props.callback.onModifySuccess}
          />

          <AccountAdditionModal
            show={this.props.visible.add}
            onHide={this.props.hide.add}
            onSuccess={this.props.callback.onAddSuccess}
          />

          <ChangePasswordModal
            username={this.state.username}
            show={this.props.visible.changePswd}
            onHide={this.props.hide.changePswd}
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
