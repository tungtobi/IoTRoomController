import React, { Component } from "react";
import {
  Card,
  Form,
  Button,
  Table,
  Spinner,
  FormCheck,
  ButtonGroup
} from "react-bootstrap";

import CenteredAlert from "../CenteredAlert";
import AccountEditorModal from "../AccountEditorModal";
import AccountAdditionModal from "../AccountAdditionModal";
import ChangePasswordModal from "../ChangePasswordModal";

import "../../logic/string";
import * as userServices from "../../services/user";

import "./style.css";
import { Redirect } from "react-router-dom";

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
        role: DIRECTION.NONE,
        locking_state: DIRECTION.NONE
      }
    };

    // Fetch from server
    this.fetchLockingState = this.fetchLockingState.bind(this);
    this.fetchDeleteAccount = this.fetchDeleteAccount.bind(this);

    this.handleChangeFilter = this.handleChangeFilter.bind(this);
  }

  handleChangeFilter(event) {
    const { name, value } = event.target;
    this.props.filter(name, value);
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
            action cannot be undo!
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
    const dataCols = [
      "username",
      "first_name",
      "last_name",
      "gender",
      "address",
      "email",
      "phone_number",
      "role",
      "locking_state"
    ];

    const searchInput = name => (
      <Form.Control
        type="text"
        name={name}
        defaultValue={this.props.default[name]}
        onChange={this.handleChangeFilter}
      />
    );

    const searchSelect = (name, options) => (
      <Form.Control
        as="select"
        name={name}
        defaultValue={this.props.default[name]}
        onChange={this.handleChangeFilter}
      >
        <option>all</option>
        {options.map((op, idx) => (
          <option key={idx}>{op}</option>
        ))}
      </Form.Control>
    );

    return (
      <Card>
        <Card.Title>Accounts Manager</Card.Title>
        <Card.Body>
          <Table responsive hover striped size="sm">
            <thead className="align-middle">
              <tr>
                <th scope="col">#</th>
                {dataCols.map((property, idx) => (
                  <th scope="col" key={idx}>
                    <Button
                      variant="link p-0"
                      onClick={() => this.sortBy(property)}
                    >
                      {property.toProperCase() === "Locking State"
                        ? "Active"
                        : property.toProperCase()}{" "}
                      <i className={this.state.sortIcon[property]}></i>
                    </Button>
                  </th>
                ))}
                <th scope="col">Action</th>
              </tr>
              <tr>
                <th scope="col" />
                <th scope="col">{searchInput("username")}</th>
                <th scope="col">{searchInput("first_name")}</th>
                <th scope="col">{searchInput("last_name")}</th>
                <th scope="col">
                  {searchSelect("gender", ["Male", "Female", "Other"])}
                </th>
                <th scope="col">{searchInput("address")}</th>
                <th scope="col">{searchInput("email")}</th>
                <th scope="col">{searchInput("phone_number")}</th>
                <th scope="col">
                  {searchSelect("role", ["admin", "standard"])}
                </th>
                <th scope="col">
                  {searchSelect("locking_state", ["lock", "unlock"])}
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
                  <td>{item.role}</td>
                  <td>
                    <FormCheck custom type="switch">
                      <FormCheck.Input
                        checked={item.locking_state === "unlock"}
                        onChange={console.log}
                        isInvalid={item.locking_state === "lock"}
                      />
                      <FormCheck.Label
                        onClick={() => this.handleClickLock(idx)}
                      ></FormCheck.Label>
                    </FormCheck>
                  </td>
                  <td className="pr-1 pl-0">
                    <ButtonGroup>
                      <Button
                        className="glow-blue"
                        onClick={() => this.handleClickProfile(idx)}
                        variant="link p-2"
                      >
                        <i className="fas fa-user-edit" />
                      </Button>
                      <Button
                        className="glow-yellow"
                        onClick={() => this.handleClickPassword(idx)}
                        variant="link p-2"
                      >
                        <i className="fas fa-key" />
                      </Button>
                      <Button
                        className="glow-red"
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
          {this.props.list.length === 0 && (
            <div className="text-center glow-red">
              <i className="fas fa-times big-not-found"></i>
              <h3 className="mb-5">Not found!</h3>
            </div>
          )}
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
          prev={this.props.list.find(
            user => user.username === this.state.username
          )}
          show={this.props.visible.changePswd}
          onHide={this.props.hide.changePswd}
          onSuccess={this.props.callback.onChangePswdSuccess}
        />
      </Card>
    );
  }
}

export default AccountsPanel;
