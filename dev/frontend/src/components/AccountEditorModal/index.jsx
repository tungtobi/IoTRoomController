import CenteredModal from "../CenteredModal/index";
import React from "react";
import { Button, ButtonToolbar } from "react-bootstrap";
import AccountEditorForm from "./form";

class AccountEditorModal extends CenteredModal {
  getTitle() {
    return "User Profile";
  }

  getBody() {
    return (
      <AccountEditorForm
        profile={this.props.profile}
        onSubmit={this.props.onSubmit}
      />
    );
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

export default AccountEditorModal;
