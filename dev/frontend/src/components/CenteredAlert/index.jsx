import React from "react";
import CenteredModal from "../CenteredModal";
import { Button } from "react-bootstrap";

class CenteredAlert extends CenteredModal {
  constructor(props) {
    super(props);
    this.getTitle = this.getTitle.bind(this);
    this.getBody = this.getBody.bind(this);
    this.getFooter = this.getFooter.bind(this);
  }

  getTitle() {
    return this.props.title;
  }

  getBody() {
    return this.props.children;
  }

  getFooter() {
    const style = this.props.danger ? "danger" : "primary";
    return (
      <Button onClick={this.props.onSubmit} variant={style}>
        {this.props.btnName}
      </Button>
    );
  }
}

export default CenteredAlert;
