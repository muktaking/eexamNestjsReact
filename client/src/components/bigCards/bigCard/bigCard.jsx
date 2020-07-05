import React, { Component } from "react";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";

import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class BigCard extends Component {
  state = {
    startDate: new Date(),
    endDate: new Date()
  };

  datePicker = this.props.showDatePicker ? (
    <div className="d-flex flex-wrap justify-content-between mb-3">
      <div>
        <span>Start Date:</span>
        <FontAwesomeIcon icon={"calendar-alt"} size="2x" className="mx-2" />
        <DatePicker
          selected={this.state.startDate}
          onChange={this.startHandleChange}
        />
      </div>
      <div>
        <span className="">End Date:</span>
        <FontAwesomeIcon icon={"calendar-alt"} size="2x" className="mx-2" />
        <DatePicker
          selected={this.state.endDate}
          onChange={this.endHandleChange}
        />
      </div>

      <Button onClick={this.reportHandler}>Show</Button>
    </div>
  ) : null;

  startHandleChange = date => {
    this.setState({
      startDate: date
    });
  };
  endHandleChange = date => {
    this.setState({
      endDate: date
    });
  };
  reportHandler = () => {
    console.log(this.state.startDate, this.state.endDate);
  };

  render() {
    return (
      <Accordion defaultActiveKey="0">
        <Card className="border-top-0">
          <Card.Header
            className={"bg-" + this.props.headerColor + " text-light"}
          >
            <div className="d-flex justify-content-between">
              {this.props.header}
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                <FontAwesomeIcon
                  icon={"bars"}
                  size="lg"
                  className="text-light"
                />
              </Accordion.Toggle>
              {/* <span className="">More..</span> */}
            </div>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {this.datePicker}
              <hr />
              {this.props.children}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}

export default BigCard;
