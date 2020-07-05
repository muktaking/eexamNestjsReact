import React from "react";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const miniBlock = props => {
  return (
    <Col md={4} key={props.key}>
      <div className="feature">
        <FontAwesomeIcon
          icon={props.icon}
          size="4x"
          transform="shrink-3 up-5"
        />
        <h3>{props.heading}</h3>
        <p>{props.para}</p>
      </div>
    </Col>
  );
};

export default miniBlock;
