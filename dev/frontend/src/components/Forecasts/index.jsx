import React, { Component } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import forecastOf from "../../logic/forecast";
import ForecastDetail from "../ForecastDetail";

class ForecastsWindow extends Component {
  constructor(props) {
    super(props);
    this.state = { info: {} };

    this.getDayFromDate = this.getDayFromDate.bind(this);
  }

  componentDidMount() {
    const cityId = "1581130";
    const appId = "e1b174f84d2289015179653f49b5ebea";
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&APPID=${appId}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ info: data });
        console.log(this.state.info.list[0]);
      })
      .catch(console.log);
  }

  getDayFromDate(date) {
    const weekday = [
      "Chủ nhật",
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu",
      "Thứ bảy"
    ];

    const dt = new Date(date);

    return weekday[dt.getDay()];
  }

  render() {
    const list = this.state.info.list;

    return (
      <Accordion>
        {list
          ? list.map((item, idx) => (
              <Card>
                <Card.Header>
                  <h3>{this.getDayFromDate(item.dt_txt)}</h3>
                  <p>{item.dt_txt.substring(0, 10)}</p>
                  <Accordion.Toggle as={Button} variant="link" eventKey={idx}>
                    Xem
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={idx}>
                  <Card.Body>
                    <ForecastDetail info={item} />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            ))
          : null}
      </Accordion>
    );
  }
}

export default ForecastsWindow;
