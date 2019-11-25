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

    this.state = {
      info: {},
      city: cityList.slice(0, 200),
      select: null,
      searching: false,
      expand: null
    };

    this.getDayFromDate = this.getDayFromDate.bind(this);
    this.filterCity = this.filterCity.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  fetchWeather(cityId) {
    const appId = "e1b174f84d2289015179653f49b5ebea";

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&APPID=${appId}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ info: data, searching: false });
        console.log(this.state.info);
      })
      .catch(console.log);
  }

  handleSearch() {
    this.setState({
      searching: true,
      info: {},
      expand: null
    });

    this.fetchWeather(this.state.select);
  }

  handleExpand(idx) {
    this.setState(prev => ({
      expand: prev.expand === idx ? null : idx
    }));

    console.log(this.state.expand);
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
    const limit = 200;

    const match = cityList.filter(city =>
      city.name.toLowerCase().startsWith(value.toLowerCase())
    );

    this.setState({
      city: match.slice(0, limit)
    });
  }

  render() {
    const list = this.state.info.list;

    return (
      <div className="p-4 ">
        <Card>
          <Card.Title>Search your city</Card.Title>
          <Card.Body>
            <Row className="panel">
              <Col>
                <Select
                  name="devices"
                  placeholder="Select city"
                  onInputChange={this.filterCity}
                  onChange={this.handleSelect}
                  options={this.state.city.map(({ id, name, country }) => ({
                    value: id,
                    label: `${name} (${country})`
                  }))}
                />
              </Col>
              <Col md="auto">
                <Button
                  onClick={this.handleSearch}
                  disabled={!this.state.select || this.state.searching}
                >
                  {this.state.searching ? "Searching..." : "Search"}
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
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
                          onClick={() => this.handleExpand(idx)}
                        >
                          <i
                            className={
                              "fas fa-chevron-down rotate " +
                              (this.state.expand === idx ? "down" : "")
                            }
                          ></i>
                        </Accordion.Toggle>
                      </Col>
                    </Row>
                  </Card.Header>
                  <Accordion.Collapse eventKey={idx}>
                    <Card.Body>
                      <div>
                        <ForecastDetail list={forecastOf(date, list)} />
                      </div>
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
