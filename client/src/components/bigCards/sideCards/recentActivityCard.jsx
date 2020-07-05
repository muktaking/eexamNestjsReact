import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import BigCard from "../bigCard/bigCard";

const sideCard = props => {
  const date = new Date().toUTCString();
  return (
    <BigCard
      header="Recent Activity"
      headerColor={"warning"}
      showDatePicker={true}
    >
      <ListGroup as="ul" variant="flush">
        <ListGroup.Item as="li" className="border-0">
          Cras justo odio at <span className="text-danger">{date}</span>{" "}
        </ListGroup.Item>
        <ListGroup.Item as="li">
          Dapibus ac facilisis in at {date}
        </ListGroup.Item>
        <ListGroup.Item as="li">Morbi leo risus at {date} </ListGroup.Item>
        <ListGroup.Item as="li">
          Porta ac consectetur ac at {date}
        </ListGroup.Item>
      </ListGroup>
    </BigCard>
  );
};

export default sideCard;
