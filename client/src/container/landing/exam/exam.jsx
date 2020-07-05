import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

//import "./exam.scss";

const exam = props => {
  const exams = {
    imgLink: [
      "http://via.placeholder.com/300",
      "http://via.placeholder.com/300",
      "http://via.placeholder.com/300",
      "http://via.placeholder.com/300"
    ],
    title: ["Title1", "Title2", "Title3", "Title4"],
    text: [
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
      "Some quick example text to build on the card title and make up the bulk of the card's content."
    ]
  };
  return (
    <div id="exam" className="mb-5 offset">
      <Col xs={12} className="narrow text-center">
        <h1>Our Top Class Exams courses</h1>
        <hr className="exam-hr" />
      </Col>
      <Row className="px-2">
        {exams.imgLink.map((value, index) => (
          <Col md={6} xl={3} className="px-2">
            <Card>
              <Card.Img variant="top" src={value} className="exam-img" />
              <Card.Body>
                <Card.Title>{exams.title[index]}</Card.Title>
                <Card.Text>{exams.text[index]}</Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="text-center mt-2">
        <a href="#" className="btn btn-secondary m-auto">
          Exams
        </a>
      </div>
    </div>
  );
};

export default exam;
