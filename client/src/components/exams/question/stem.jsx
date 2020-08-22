import React from "react";
import { Form, Col, InputGroup, Row } from "react-bootstrap";
const questionStemView = ({
  id,
  qType,
  stem,
  index,
  handleChange,
  defaultChecked,
}) => {
  return (
    <Row className="pr-3 pl-2">
      <Col lg={10}>
        <div>{index + ". " + stem}</div>
      </Col>
      <Col lg={2}>
        <Form.Group as={Col} controlId="formGroupQuestionStemAnswer">
          {qType === "matrix" ? (
            <>
              <Form.Check
                inline
                type="radio"
                label="True"
                name={id + "_" + index}
                id="formHorizontalRadios1"
                value={1}
                defaultChecked={defaultChecked === "1"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                type="radio"
                label="False"
                name={id + "_" + index}
                id="formHorizontalRadios2"
                value={0}
                defaultChecked={defaultChecked === "0"}
                onChange={handleChange}
              />
            </>
          ) : (
            <Form.Check
              type="radio"
              name={id}
              id="formHorizontalRadios1"
              value={index}
              defaultChecked={defaultChecked === index}
              onChange={handleChange}
            />
          )}
        </Form.Group>
      </Col>
    </Row>
  );
};

export default questionStemView;
