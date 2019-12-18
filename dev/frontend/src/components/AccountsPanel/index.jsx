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

class AccountsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: props.list,
      fetchSuccess: props.fetchSuccess,
      username: null,
      locking_state: null,
      alert: {
        show: false,
        title: null,
        body: null
      },

      showEditor: false
    };

    this.showAccountEditorModal = this.showAccountEditorModal.bind(this);
    this.hideAccountEditorModal = this.hideAccountEditorModal.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      list: nextProps.list,
      fetchSuccess: nextProps.fetchSuccess
    };
  }

  handleClickLock(idx) {
    const { username, locking_state } = this.state.list[idx];

    this.setState({
      username,
      locking_state,
      alert: {
        show: true,
        title: `${locking_state === "lock" ? "Unlock" : "Lock"} account`,
        body: (
          <div>
            Do you sure want to {locking_state === "lock" ? "unlock" : "lock"}{" "}
            account <strong>{username}</strong>
          </div>
        )
      }
    });
  }

  showAccountEditorModal(idx) {
    const { username } = this.state.list[idx];

    this.setState({ username, showEditor: true });
  }

  hideAccountEditorModal() {
    this.setState({ showEditor: false });
  }

  async changeLockingState() {
    const { username, locking_state } = this.state;

    if (locking_state === "unlock") {
      await userServices.lock(
        username,
        this.props.lockSuccess,
        this.props.onFailure
      );
    } else {
      await userServices.unlock(
        username,
        this.props.unlockSuccess,
        this.props.onFailure
      );
    }

    this.setState({ alert: { show: false } });
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
                          // onClick={() => this.showAccountEditorModal(idx)}
                          variant="link p-2"
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                        <Button
                          // onClick={() => this.showAccountEditorModal(idx)}
                          variant="link p-2"
                        >
                          <i className="fas fa-user-shield"></i>
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
              onClick={this.props.showDevAddModal}
            >
              <i className="fas fa-plus" /> Add new device
            </Button>
            <Button variant="light gray-outline float-right mr-2">
              <i className="fas fa-plus" /> Nothing
            </Button>
          </Card.Footer>

          <CenteredAlert
            show={this.state.alert.show}
            onHide={() => this.setState({ alert: { show: false } })}
            title={this.state.alert.title}
            button_name="Yes"
            danger="true"
            onSubmit={() => this.changeLockingState()}
          >
            {this.state.alert.body}
          </CenteredAlert>

          <AccountEditorModal
            show={this.state.showEditor}
            onHide={this.hideAccountEditorModal}
            profile={this.state.list.find(
              user => user.username === this.state.username
            )}
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
