import React from "react";
import {
  Accordion,
  Spinner,
  Form,
  Button,
  Card,
  Col,
  InputGroup,
  Row,
} from "react-bootstrap";
const questionStemView = ({ qType, stem, index, handleChange }) => {
  return (
    <Row className="pr-3 pl-2 mt-1">
      <Col lg={5}>
        <Form.Group controlId="formGroupQuestionStem">
          <InputGroup className="mb-2">
            <InputGroup.Prepend>
              <InputGroup.Text>{index}</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="text"
              placeholder="stem..."
              name={"qStem" + index}
              value={stem["qStem" + index]}
              // value={Question ? Question.title : null}
              onChange={handleChange}
            />
          </InputGroup>
        </Form.Group>
      </Col>
      <Col lg={2}>
        <Form.Group as={Col} controlId="formGroupQuestionStemAnswer">
          {qType === "matrix" ? (
            <>
              <Form.Check
                inline
                type="radio"
                label="True"
                name={"aStem" + index}
                id="formHorizontalRadios1"
                value={1}
                selected={stem["aStem" + index] === "1"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                type="radio"
                label="False"
                name={"aStem" + index}
                id="formHorizontalRadios2"
                value={0}
                selected={stem["aStem" + index] === "0"}
                onChange={handleChange}
              />
            </>
          ) : (
            <Form.Check
              type="radio"
              name={"aStemSba"}
              id="formHorizontalRadios1"
              value={index}
              selected={stem["aStemSba"] === index.toString()}
              onChange={handleChange}
            />
          )}
        </Form.Group>
      </Col>
      <Col lg={5}>
        <Form.Group as={Col} controlId="formGroupQuestionStemFeedBack">
          <Form.Control
            type="text"
            placeholder="FeedBack"
            name={"fbStem" + index}
            value={stem["fbStem" + index]}
            // value={Question ? Question.title : null}
            onChange={handleChange}
          />
        </Form.Group>
      </Col>
    </Row>
  );
};

export default questionStemView;
