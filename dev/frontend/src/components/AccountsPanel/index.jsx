import React, { Component } from "react";
import Card from "react-bootstrap/Card";

import {
  Button,
  Table,
  Spinner,
  FormCheck,
  ButtonGroup
} from "react-bootstrap";
import * as userServices from "../../services/user";
import CenteredAlert from "../CenteredAlert";
import AccountEditorModal from "../AccountEditorModal";
import AccountAdditionModal from "../AccountAdditionModal";
import ChangePasswordModal from "../ChangePasswordModal";

const DIRECTION = {
  NONE: "fas fa-sort",
  DOWN: "fas fa-sort-down",
  UP: "fas fa-sort-up"
};

class AccountsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      locking_state: null,

      alert: {
        action: null,
        title: null,
        body: null
      },

      sortIcon: {
        username: DIRECTION.NONE,
        first_name: DIRECTION.NONE,
        last_name: DIRECTION.NONE,
        gender: DIRECTION.NONE,
        address: DIRECTION.NONE,
        email: DIRECTION.NONE,
        phone_number: DIRECTION.NONE,
        locking_state: DIRECTION.NONE
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
        title: `Delete Account`,
        body: (
          <div>
            Do you sure want to delete account <strong>{username}</strong>. This
            action cannot undo!
          </div>
        )
      }
    });

    this.props.show.alert();
  }

  handleClickLock(idx) {
    const { username, locking_state } = this.props.list[idx];

    this.setState({
      username,
      locking_state,
      alert: {
        action: "lock",
        title: `${locking_state === "lock" ? "Unlock" : "Lock"} Account`,
        body: (
          <div>
            Do you sure want to {locking_state === "lock" ? "unlock" : "lock"}{" "}
            account <strong>{username}</strong>
          </div>
        )
      }
    });

    this.props.show.alert();
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
    this.props.process();

    const { username } = this.state;

    await userServices.remove(
      username,
      this.props.callback.onDeleteSuccess,
      this.props.callback.onFailure
    );
  }

  async fetchLockingState() {
    this.props.process();

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
  }

  sortBy(property) {
    let { sortIcon } = this.state;

    const prevDirect = sortIcon[property];

    if (prevDirect === DIRECTION.NONE) {
      sortIcon[property] = DIRECTION.UP;
      this.props.sort(property, "down");
    } else if (prevDirect === DIRECTION.UP) {
      sortIcon[property] = DIRECTION.DOWN;
      this.props.sort(property, "up");
    } else if (prevDirect === DIRECTION.DOWN) {
      sortIcon[property] = DIRECTION.UP;
      this.props.sort(property, "down");
    }

    this.setState({
      sortIcon
    });
  }

  render() {
    String.prototype.toProperCase = function() {
      return this.replace("_", " ").replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    };

    return (
      <Card>
        <Card.Title>Accounts Manager</Card.Title>
        <Card.Body>
          <Table responsive hover striped>
            <thead>
              <tr>
                <th scope="col" className="align-middle">
                  #
                </th>
                {[
                  "username",
                  "first_name",
                  "last_name",
                  "gender",
                  "address",
                  "email",
                  "phone_number",
                  "locking_state"
                ].map((property, idx) => (
                  <th scope="col" key={idx} className="align-middle">
                    <ButtonGroup>
                      {property.toProperCase()}
                      <Button
                        variant="link py-0 px-1"
                        onClick={() => this.sortBy(property)}
                      >
                        <i className={this.state.sortIcon[property]}></i>
                      </Button>
                    </ButtonGroup>
                  </th>
                ))}

                <th scope="col" className="align-middle">
                  Action
                </th>
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
          show={this.props.visible.alert}
          onHide={this.props.hide.alert}
          title={this.state.alert.title}
          disabled={this.props.isProcess === true}
          button_name={
            this.props.isProcess === true ? (
              <div>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{" "}
                Processing
              </div>
            ) : (
              "Yes, continue!"
            )
          }
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
    // else if (fetchSuccess === false)
    //   return <FailureAlert message={this.props.response} />;
    // else
    //   return (
    //     // <Card>
    //     //   <Card.Title>Accounts Manager</Card.Title>
    //     //   <Card.Body></Card.Body>
    //     // </Card>
    //     <Loading />
    //   );
  }
}

export default AccountsPanel;
