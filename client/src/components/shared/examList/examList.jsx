import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";

const eType = [
  "Assignment",
  "Weekly",
  "Monthly",
  "Assesment",
  "Term",
  "Test",
  "Final",
];

const ExamList = ({ title, type, description, createdAt, id }) => {
  return (
    <Card>
      <Row>
        <Col lg={4} className="align-self-center">
          <Card.Img variant="top" src="https://picsum.photos/286/180" />
          <Card.Subtitle
            style={{ position: "absolute", top: "15px", right: "15px" }}
            className="bg-danger p-2 text-light"
          >
            {eType[+type]}
          </Card.Subtitle>
          <p
            style={{ position: "absolute", bottom: "-15px" }}
            className="bg-dark p-2 text-light"
          >
            {" "}
            Start From: {moment(createdAt).calendar()}
          </p>
        </Col>
        <Col lg={8}>
          <Card.Body className="bg-dark text-light">
            <Card.Title className="py-1 border-bottom">{title}</Card.Title>

            <Card.Text>{description}</Card.Text>
            <Link to={"/exams/" + id}>Enter to Exam</Link>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default ExamList;
