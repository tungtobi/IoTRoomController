import CenteredModal from "../CenteredModal/index";
import React from "react";
import { Button, ButtonToolbar } from "react-bootstrap";
import ScenarioAdditionForm from "./form";

class ScenarioAdditionModal extends CenteredModal {
  getTitle() {
    return "Add a new scenario";
  }

  getBody() {
    return <ScenarioAdditionForm />;
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

export default ScenarioAdditionModal;
