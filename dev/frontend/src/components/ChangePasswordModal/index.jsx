import CenteredModal from "../CenteredModal/index";
import React from "react";
import { Button, ButtonToolbar } from "react-bootstrap";
import ChangePasswordForm from "./form";

class ChangePasswordModal extends CenteredModal {
  getTitle() {
    return "Change password";
  }

  getBody() {
    return <ChangePasswordForm onSubmit={this.props.onSubmit} />;
  }

  getFooter() {
    return (
      <ButtonToolbar>
        <Button
          onClick={this.props.onHide}
          variant="light"
          style={{ border: "1px solid #c6c6c6", marginInlineEnd: "8px" }}
        >
          Close
        </Button>
        <Button onClick={this.props.onSubmit}>Save changes</Button>
      </ButtonToolbar>
    );
  }
}

export default ChangePasswordModal;
