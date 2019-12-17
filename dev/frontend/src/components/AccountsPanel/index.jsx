import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { Button, Table } from "react-bootstrap";

class AccountsPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: []
    };
  }

  componentDidMount() {}

  // fetchUserList() {
  //   const proxyurl = "https://cors-anywhere.herokuapp.com/";
  //   const url = "http://54.237.117.36:3000/admin/list-user";

  //   fetch(proxyurl + url, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       token: localStorage.getItem("token")
  //     })
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       if (data.error_code === 0) {

  //       }
  //     })
  //     .catch(this.handleLoginFailure);
  // }
  // }

  render() {
    return (
      <Card>
        <Card.Title>Accounts Manager</Card.Title>
        <Card.Body>
          <Table responsive hover striped>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Device Name</th>
                <th scope="col">Seria Number</th>
                <th scope="col">Created Date</th>
                <th scope="col">Status</th>
                <th scope="col">Accounts</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.props.accounts.map(item => (
                <tr>
                  <th scope="row">{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.seria}</td>
                  <td>{item.createdDate}</td>
                  <td>{item.status}</td>
                  <td>{item.accounts}</td>
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
  }
}

export default AccountsPanel;
