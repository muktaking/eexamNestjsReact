import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const searchForm = props => {
  return (
    <Form inline>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Search..."
          className={props.formControl}
        />
        <Button
          variant="light"
          type="search
        "
          className={props.searchBtn}
        >
          <FontAwesomeIcon icon="search" className="text-danger" />
        </Button>
      </Form.Group>
    </Form>
  );
};

export default searchForm;
