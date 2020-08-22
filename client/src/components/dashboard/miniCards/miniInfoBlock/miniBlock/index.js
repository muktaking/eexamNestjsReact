import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Header from "./header";
import Footer from "./footer";
import Icon from "./icon";

const miniBlock = ({
  heading,
  color,
  value,
  faIcon,
  footerHeading,
  footerValue,
  faFooterIcon,
}) => {
  return (
    <Card className="card-common">
      <Card.Body>
        <Row>
          <Col sm={8}>
            <Header heading={heading} color={color} value={value} />
          </Col>
          <Col sm={4}>
            <div className="d-flex  align-items-center justify-content-end h-100">
              <Icon icon={faIcon} size={"3x"} classes={"text-" + color} />
            </div>
          </Col>
        </Row>
      </Card.Body>
      <Footer
        color={color}
        heading={footerHeading}
        value={footerValue}
        icon={faFooterIcon}
      />
    </Card>
  );
};

export default miniBlock;
