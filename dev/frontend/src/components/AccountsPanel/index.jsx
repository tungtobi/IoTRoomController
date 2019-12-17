import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { Button, Table, Spinner } from "react-bootstrap";
import * as userServices from "../../services/user";

class AccountsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchSucess: null,
      list: []
    };

    this.handleFetchSucess = this.handleFetchSucess.bind(this);
  }

  componentDidMount() {
    this.fetchUserList();
  }

  async fetchUserList() {
    // const proxyurl = "https://cors-anywhere.herokuapp.com/";
    // const url = "http://54.237.117.36:3000/admin/list-user";

    // fetch(proxyurl + url, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     token: localStorage.getItem("token")
    //   })
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     if (data.error_code === 0) {
    //       this.handleFetchSucess(data);
    //     }
    //   })
    //   .catch(console.log);

    await userServices.list(this.handleFetchSucess);
  }

  handleFetchSucess(res) {
    let users = [];
    for (var propName in res) {
      if (propName.startsWith("user_")) {
        users.push(res[propName]);
      }
    }
    this.setState({ list: users, fetchSucess: true });
  }

  handleFetchFailure() {
    this.setState({ fetchSucess: false });
  }

  render() {
    if (this.state.fetchSucess === true)
      return (
        <React.Fragment>
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
        </React.Fragment>
      );
    else
      return (
        <Card>
          <Card.Title>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />{" "}
            Loading
          </Card.Title>
          <Card.Body />
        </Card>
      );
  }
}

export default AccountsPanel;
