import React, { Component } from "react";
import { Accordion, Card, Button, Row, Col } from "react-bootstrap";
import forecastOf from "../../logic/forecast";
import getDateList from "../../logic/datelist";
import ForecastDetail from "../ForecastDetail";
import cityList from "../../resources/citylist.json";
import Select from "react-select";

import "./style.css";

class ForecastsWindow extends Component {
  constructor(props) {
    super(props);
    this.state = { info: {}, city: [], select: null };

    this.getDayFromDate = this.getDayFromDate.bind(this);
    this.filterCity = this.filterCity.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {}

  fetchWeather(cityId) {
    const appId = "e1b174f84d2289015179653f49b5ebea";

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&APPID=${appId}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ info: data });
        console.log(this.state.info);
      })
      .catch(console.log);
  }

  handleSearch() {
    this.fetchWeather(this.state.select);
  }

  handleSelect(option) {
    this.setState({
      select: option.value
    });
  }

  getDayFromDate(date) {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    const dt = new Date(date);

    return weekday[dt.getDay()];
  }

  filterCity(value) {
    const match = cityList.filter(city => city.name.startsWith(value));

    if (match.length < 500) {
      this.setState({
        city: match
      });
    } else {
      this.setState({
        city: []
      });
    }
  }

  render() {
    const list = this.state.info.list;

    return (
      <div className="p-4 ">
        <Row className="panel">
          <Col>
            <Select
              name="devices"
              onInputChange={this.filterCity}
              onChange={this.handleSelect}
              options={this.state.city.map(({ id, name, country }) => ({
                value: id,
                label: `${name} (${country})`
              }))}
            />
          </Col>
          <Col md="auto">
            <Button onClick={this.handleSearch} disabled={!this.state.select}>
              Search
            </Button>
          </Col>
        </Row>
        {list && (
          <Card className="panel mt-4">
            <Accordion>
              {getDateList(list).map((date, idx) => (
                <div key={idx}>
                  <Card.Header>
                    <Row>
                      <Col>
                        <h3>{this.getDayFromDate(date)}</h3>
                        {date}
                      </Col>

                      <Col className="btn-expand">
                        <Accordion.Toggle
                          as={Button}
                          variant="link"
                          eventKey={idx}
                        >
                          <i className="fas fa-eye"></i>
                        </Accordion.Toggle>
                      </Col>
                    </Row>
                  </Card.Header>
                  <Accordion.Collapse eventKey={idx}>
                    <Card.Body>
                      <ForecastDetail list={forecastOf(date, list)} />
                    </Card.Body>
                  </Accordion.Collapse>
                </div>
              ))}
            </Accordion>
          </Card>
        )}
      </div>
    );
  }
}

export default ForecastsWindow;
