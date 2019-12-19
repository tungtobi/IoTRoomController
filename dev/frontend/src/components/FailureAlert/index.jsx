import React, { Component } from "react";
import { Alert } from "react-bootstrap";

class FailureAlert extends Component {
  render() {
    return (
      <Alert variant="danger">
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          Check your connection and try again.
          <br />
          {this.props.message}.
        </p>
      </Alert>
    );
  }
}

export default FailureAlert;
