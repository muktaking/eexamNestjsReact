import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Jumbotron from "react-bootstrap/Jumbotron";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//import "./clients.scss";

const feature = props => {
  return (
    <div id="clients" className="offset">
      <Jumbotron>
        <Col xs={12} className="text-center">
          <h3 className="heading">Clients</h3>
          <div className="heading-underline"></div>
        </Col>
        <Row className="">
          <Col md={6} className="clients">
            <Row>
              <Col md={4}>
                <Image src="assets/image/client1.png" />
              </Col>
              <Col md={8}>
                <blockquote>
                  <FontAwesomeIcon icon={"quote-left"} />
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                  <hr className="clients-hr" />
                  <cite>&#8212; Ericker fucker, sucker</cite>
                </blockquote>
              </Col>
            </Row>
          </Col>
        </Row>
      </Jumbotron>
      <Col xs={12} className="narrow text-center">
        <p className="lead">Want to start practice</p>
        <Button size="md" variant="secondary">
          Exams
        </Button>
      </Col>
    </div>
  );
};

export default feature;
