import React, { useState } from "react";

import Stems from "./questionStem.view";

import { Accordion, Spinner, Form, Button, Card } from "react-bootstrap";

const QuestionForm = (props) => {
  const {
    submitHandler,
    handleChange,
    formErrors,
    categories,
    title,
    categoryRef,
    question,
    showEditQuestionAccordionStateHandler,
  } = props;
  const [stemAmount, setStemAmount] = useState([1, 2, 3, 4, 5]);
  return (
    <Accordion className="mt-3" defaultActiveKey={title && "0"}>
      <Accordion.Toggle as={Card.Header} eventKey="0">
        <h3> {title ? "Edit " + title : "Create A New"} Question</h3>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0">
        <Form className="mt-2" onSubmit={submitHandler}>
          <Form.Group controlId="formGroupQuestionTitle">
            <Form.Label>Question Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Question Title"
              name="title"
              value={question.title}
              onChange={handleChange}
            />
            {formErrors.title.length > 0 && (
              <span className="errorMessage">{formErrors.title}</span>
            )}
          </Form.Group>
          <Form.Group controlId="formGridCategory">
            <Form.Label>Question Category</Form.Label>
            <Form.Control
              as="select"
              name="category"
              defaultValue={question.category}
              onChange={handleChange}
              ref={categoryRef}
            >
              {/* <option value="Top">Top</option> */}
              {categories.map((value, index) => {
                let CategorySlug = value.slug.replace(/_/g, " / ");
                return (
                  <option
                    key={index}
                    value={value._id}
                    //selected={Question && value._id === Question.parentId}
                  >
                    {CategorySlug}
                  </option>
                );
              })}
            </Form.Control>
            {formErrors.category.length > 0 && (
              <span className="errorMessage">{formErrors.category}</span>
            )}
          </Form.Group>
          <Form.Group controlId="formGridQType">
            <Form.Label>Question Category</Form.Label>
            <Form.Control
              as="select"
              name="qType"
              value={question.qType}
              onChange={handleChange}
              // ref={selectOptionValueRef}
            >
              <option value="matrix">Matrix</option>
              <option value="sba">SBA</option>
            </Form.Control>
            {formErrors.category.length > 0 && (
              <span className="errorMessage">{formErrors.category}</span>
            )}
          </Form.Group>

          <Form.Group controlId="formGroupQuestionQText">
            <Form.Label>Question Text</Form.Label>
            <Form.Control
              type="text"
              placeholder="Question text"
              name="qText"
              value={question.qText}
              // value={Question ? Question.title : null}
              onChange={handleChange}
            />
            {formErrors.title.length > 0 && (
              <span className="errorMessage">{formErrors.qText}</span>
            )}
          </Form.Group>
          <div>
            {stemAmount.map((i) => (
              <Stems
                key={"stem-" + i}
                index={i}
                stem={question.stem}
                qType={question.qType}
                handleChange={handleChange}
              />
            ))}
            {formErrors.stem.length > 0 && (
              <span className="errorMessage">{formErrors.stem}</span>
            )}
            {/* <Button
              onClick={() => {
                setStemAmount((prevStemAmount) => [
                  ...prevStemAmount,
                  prevStemAmount.length + 1,
                ]);
              }}
            >
              Add
            </Button>
            <Button
              onClick={() => {
                setStemAmount((prevStemAmount) =>
                  prevStemAmount.filter((v, i, arr) => v !== arr.length)
                );
              }}
            >
              Delete
            </Button> */}
          </div>
          {/* <Form.Group controlId="formGroupQuestionOrder">
            <Form.Label>Question Order</Form.Label>
            <Form.Control
              type="text"
              name="order"
              value={Question && Question.order}
              placeholder="e.g. 5 <..Order makes priority. Lower value higher order..>"
              onChange={handleChange}
            />
            {formErrors.order.length > 0 && (
              <span className="errorMessage">{formErrors.order}</span>
            )}
          </Form.Group>

          <Form.Group controlId="formGroupQuestionDes">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="textarea"
              placeholder="Enter short description"
              name="description"
              value={Question && Question.description}
              onChange={handleChange}
            />
            {formErrors.description.length > 0 && (
              <span className="errorMessage">{formErrors.description}</span>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Upload Image</Form.Label>
            <input
              type="file"
              name="image"
              className={"form-control-file"}
              onChange={handleChange}
            />
            {formErrors.image.length > 0 && (
              <span className="errorMessage">{formErrors.image}</span>
            )}
          </Form.Group> */}

          <Button type="submit" className="btn-submit">
            Submit
          </Button>
          {title && (
            <Button
              variant="success"
              className="ml-3"
              onClick={showEditQuestionAccordionStateHandler}
            >
              Cancel
            </Button>
          )}
        </Form>
      </Accordion.Collapse>
    </Accordion>
  );
};

export default QuestionForm;
