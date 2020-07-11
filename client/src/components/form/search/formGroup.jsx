import React from "react";
import Form from "react-bootstrap/Form";

const formGroup = (props) => {
  let group;
  switch (props.type) {
    case "select":
      <Form.Control as="select" name={props.name} onChange={props.handleChange}>
        {props.selectOptions}
      </Form.Control>;
      break;
    default:
      group = (
        <Form.Control
          type={props.type}
          placeholder={props.placeholder}
          name={props.name}
          onChange={props.handleChange}
        />
      );
      break;
  }

  return (
    <Form.Group controlId={"formGroup" + props.name} style={props.style}>
      <Form.Label>{props.label}</Form.Label>

      {props.type === "select" && (
        <Form.Control
          as="select"
          name={props.name}
          onChange={props.handleChange}
        >
          {props.selectOptions}
        </Form.Control>
      )}
      <Form.Control
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        onChange={props.handleChange}
      />
      {props.error && <span className="errorMessage">{error}</span>}
    </Form.Group>
  );
};

export default formGroup;
