import React from "react";
import Card from "react-bootstrap/Card";

const cardHeader = ({ heading, color, value }) => (
  <Card.Text className="text-right text-secondary">
    <h5>{heading}</h5>
    <h3 className={"text-" + color}>{value}</h3>
  </Card.Text>
);

export default cardHeader;
