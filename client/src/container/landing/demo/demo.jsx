import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import MiniBlock from "../miniBlock/miniBlock";

//import "./demo.scss";

const demo = props => {
  const features = {
    heading: ["Cloud Based", "Anywhere At Anytime", "Accurecy"],
    para: [
      "All System is based on cloud. Test the digitalization in exam management system",
      "You can give exam at anytime from anywhere. Home, sweet home!! ",
      "We try hard to make all questions and answers 100% accuret "
    ],
    faIcons: ["cloud", "hourglass", "thumbs-up"]
  };

  return (
    <div id="demo" className="offset">
      <div className="fixed-background">
        <Row className="dark text-center">
          <Col xs={12}>
            <h3 className="heading">A Snippet Of System</h3>
            <div className="heading-underline"></div>
          </Col>
          <Row>
            {features.faIcons.map((value, index) => (
              <MiniBlock
                key={index}
                icon={value}
                heading={features.heading[index]}
                para={features.para[index]}
              />
            ))}
          </Row>
        </Row>
        <div className="fixed-wrap">
          <div className="fixed"></div>
        </div>
      </div>
    </div>
  );
};

export default demo;
