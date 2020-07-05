import React from "react";
import Card from "react-bootstrap/Card";
import Icon from "./icon";

const footer = ({ color, heading, value, icon }) => {
  return (
    <Card.Footer className={"bg-" + color + " text-light text-right"}>
      <span className="mr-2">{heading}</span>
      <span className="mr-5">{value}</span>
      <Icon icon={icon} size="md" className="mr-2" />
    </Card.Footer>
  );
};

export default footer;
