import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import "./style.css";

class CenteredModal extends Component {
  constructor(props) {
    super(props);
    this.getTitle = this.getTitle.bind(this);
    this.getBody = this.getBody.bind(this);
    this.getFooter = this.getFooter.bind(this);
  }

  getTitle() {}

  getBody() {}

  getFooter() {}

  render() {
    return (
      <Modal
        {...this.props}
        // aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title /*id="contained-modal-title-vcenter"*/>
            {this.getTitle()}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.getBody()}</Modal.Body>
        <Modal.Footer>{this.getFooter()}</Modal.Footer>
      </Modal>
    );
  }
}

export default CenteredModal;
