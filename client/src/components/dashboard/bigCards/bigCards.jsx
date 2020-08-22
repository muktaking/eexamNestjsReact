import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "react-datepicker/dist/react-datepicker.css";

import ReportCard from "./mainContentCards/reportCard";
import RecentActivityCard from "./sideCards/recentActivityCard";
import ExamFeaturedCard from "./mainContentCards/examsFeaturedCard";

const BigCards = props => {
  return (
    <>
      <Row>
        <Col lg={8}>
          <ReportCard />
          <hr />
          <ExamFeaturedCard />
        </Col>
        <Col lg={4}>
          <RecentActivityCard />
          <hr />
          <RecentActivityCard />
        </Col>
      </Row>
    </>
  );
};

export default BigCards;
