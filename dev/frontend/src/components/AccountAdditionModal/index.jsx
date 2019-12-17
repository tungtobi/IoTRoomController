import CenteredModal from "../CenteredModal/index";
import React from "react";
import { Button, ButtonToolbar } from "react-bootstrap";
import AccountAdditionForm from "./form";

class AccountAdditionModal extends CenteredModal {
  getTitle() {
    return "Add a new account";
  }

  getBody() {
    return <AccountAdditionForm onSubmit={this.props.onSubmit} />;
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

export default AccountAdditionModal;
