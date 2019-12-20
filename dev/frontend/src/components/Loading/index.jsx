import React, { Component } from "react";
import { Spinner } from "react-bootstrap";

class Loading extends Component {
  render() {
    return (
      <div className="p-4">
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />{" "}
        Loading
      </div>
    );
  }
}

export default Loading;
