import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { Button, Table, Spinner, Alert } from "react-bootstrap";

class AccountsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: props.list,
      fetchSucess: props.fetchSucess
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      list: nextProps.list,
      fetchSucess: nextProps.fetchSucess
    };
  }

  render() {
    const { fetchSucess } = this.state;
    if (fetchSucess === true)
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
                    <td className="p-0">
                      <button
                        onClick={() => this.props.showDevEditModal()}
                        type="button"
                        className="btn btn-link"
                      >
                        <i className="far fa-edit"></i>
                      </button>
                      <button
                        onClick={() => this.props.removeDevice(item.seria)}
                        style={{ color: "Tomato" }}
                        type="button"
                        className="btn btn-link"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
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
        </Card>
      );
    else if (fetchSucess === false)
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
