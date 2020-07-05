import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Jumbotron from "react-bootstrap/Jumbotron";

import MiniBlock from "../miniBlock/miniBlock";

//import "./feature.scss";

const feature = props => {
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
    <div id="feature" className="offset">
      <Jumbotron>
        <div className="narrow text-center">
          <Col xs={12}>
            <h3 className="heading">Features</h3>
            <div className="heading-underline"></div>
          </Col>
          <Row className="">
            {features.faIcons.map((value, index) => (
              <MiniBlock
                key={index}
                icon={value}
                heading={features.heading[index]}
                para={features.para[index]}
              />
            ))}
          </Row>
        </div>
      </Jumbotron>
    </div>
  );
};

export default feature;
