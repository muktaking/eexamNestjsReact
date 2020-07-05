import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//import "./contact.scss";

const contact = props => {
  const socials = [
    ["fab", "facebook-square"],
    ["fab", "twitter-square"],
    ["fab", "instagram"]
  ];
  return (
    <div id="contact" className="offset">
      <footer>
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <p className="lead">
              We are highly trained team to manage the exam system for you
            </p>
            <strong>Contact Info</strong>
            <p>
              880-01734555 <br />
              gmail@gmail.com{" "}
            </p>
            {socials.map(value => (
              <a key={value} href="#" target="_blank" rel="noopener noreferrer">
                {/* <FontAwesomeIcon icon={["fab", "apple"]} /> */}
                <FontAwesomeIcon icon={value} />
              </a>
            ))}
          </Col>
          <hr className="socket" />
          &copy; Nano theme
        </Row>
        <Row className="justify-content-center">
          <Col md={12} className="text-center">
            <p className="lead">
              We are highly trained team to manage the exam system for you
            </p>
            <strong>Contact Info</strong>
            <p>
              880-01734555 <br />
              gmail@gmail.com{" "}
            </p>
            {socials.map(value => (
              <a key={value} href="#" target="_blank" rel="noopener noreferrer">
                {/* <FontAwesomeIcon icon={["fab", "apple"]} /> */}
                <FontAwesomeIcon icon={value} />
              </a>
            ))}
          </Col>
          <Col md={12} className="text-center">
            <p className="lead">
              We are highly trained team to manage the exam system for you
            </p>
            <strong>Contact Info</strong>
            <p>
              880-01734555 <br />
              gmail@gmail.com{" "}
            </p>
            {socials.map(value => (
              <a key={value} href="#" target="_blank" rel="noopener noreferrer">
                {/* <FontAwesomeIcon icon={["fab", "apple"]} /> */}
                <FontAwesomeIcon icon={value} />
              </a>
            ))}
          </Col>
        </Row>
      </footer>
    </div>
  );
};

export default contact;
