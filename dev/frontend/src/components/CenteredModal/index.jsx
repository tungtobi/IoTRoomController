import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";

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
    const { onSuccess, onFailure, self, ...rest } = this.props;
    return (
      <Modal {...rest} centered>
        <Modal.Header closeButton>
          <Modal.Title>{this.getTitle()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.getBody()}</Modal.Body>
        <Modal.Footer>{this.getFooter()}</Modal.Footer>
      </Modal>
    );
  }
}

CenteredModal.propTypes = {
  self: PropTypes.bool
};

export default CenteredModal;
