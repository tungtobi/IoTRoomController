import React, { Component } from "react";
import { Accordion, Card, Button, Row, Col } from "react-bootstrap";
import forecastOf from "../../logic/forecast";
import getDateList from "../../logic/datelist";
import ForecastDetail from "../ForecastDetail";
import CITY_LIST from "../../resources/citylist.json";
import Select from "react-select";
import Map from "../Map";

import "./style.css";

class ForecastsWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      info: {},
      city: CITY_LIST.slice(0, 200),
      select: null,
      searching: false,
      expand: null
    };

    this.myRef = React.createRef();

    this.getDayFromDate = this.getDayFromDate.bind(this);
    this.filterCity = this.filterCity.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.scroll = this.scrollIntoForecast.bind(this);
  }

  fetchWeather(cityId) {
    const APP_ID = "e1b174f84d2289015179653f49b5ebea";

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&APPID=${APP_ID}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ info: data, searching: false });
        this.scrollIntoForecast();
      })
      .catch(console.log);
  }

  handleSearch() {
    this.setState({
      searching: true,
      info: {},
      expand: null
    });

    this.fetchWeather(this.state.select.id);
  }

  handleExpand(idx) {
    this.setState(prev => ({
      expand: prev.expand === idx ? null : idx
    }));
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

    const match = CITY_LIST.filter(city =>
      city.name.toLowerCase().startsWith(value.toLowerCase())
    );

    this.setState({
      city: match.slice(0, limit)
    });
  }

  scrollIntoForecast() {
    this.myRef.current.scrollIntoView({ behavior: "smooth" });
  }

  savePdfFile() {}

  render() {
    const list = this.state.info.list;

    const defaultLocation = {
      lat: 21.0245,
      lng: 105.841171
    };

    return (
      <div className="p-4 ">
        <Card>
          <Card.Title>Locate Your City</Card.Title>
          <Card.Body>
            <Row className="panel">
              <Col>
                <Select
                  name="devices"
                  placeholder="Select city"
                  onInputChange={this.filterCity}
                  onChange={this.handleSelect}
                  options={this.state.city.map(option => ({
                    value: option,
                    label: `${option.name} (${option.country})`
                  }))}
                />
              </Col>
              <Col md="auto" className="pl-0">
                <Button
                  onClick={this.handleSearch}
                  disabled={!this.state.select || this.state.searching}
                >
                  <span>
                    <i className="fas fa-search"></i>
                  </span>
                  {this.state.searching ? " Searching..." : " Search"}
                </Button>
              </Col>
            </Row>{" "}
            <Row>
              <Map
                center={
                  this.state.select
                    ? {
                        lat: this.state.select.coord.lat,
                        lng: this.state.select.coord.lon
                      }
                    : defaultLocation
                }
                defaultCenter={defaultLocation}
                zoom={11}
              />
            </Row>
          </Card.Body>
        </Card>
        {list && (
          <Card className="panel mt-4" ref={this.myRef}>
            <Card.Title>
              {/* <i className="fas fa-cloud-sun" />  */}
              5-day Wearther Forecast
            </Card.Title>
            <Card.Body>
              <Accordion>
                {getDateList(list).map((date, idx) => (
                  <div key={idx}>
                    <Card.Header className="bg-light-blue">
                      <Row>
                        <Col className="white-text">
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
                            />
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
            </Card.Body>
            <Card.Footer>
              <Button
                variant="link"
                className="p-0 float-left"
                onClick={this.savePdfFile.bind(this)}
              >
                <i className="fas fa-print"></i> Print
              </Button>
            </Card.Footer>
          </Card>
        )}
      </div>
    );
  }
}

export default ForecastsWindow;
