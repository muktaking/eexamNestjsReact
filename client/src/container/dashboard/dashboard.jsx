import React from "react";
import Row from "react-bootstrap/Row";
import MiniCards from "../../components/dashboard/miniCards/miniCards";
import BigCards from "../../components/dashboard/bigCards/bigCards";

const dashboard = (props) => {
  return (
    <>
      <Row className="pt-md-3 mt-md-3 mb-2 ml-3">
        <MiniCards />
        {/* <Col sm={6} className="p-2"></Col> */}
      </Row>
      <div className="pt-md-2 mt-md-2 mb-2 ml-3">
        <BigCards />
      </div>
    </>
  );
};

export default dashboard;
