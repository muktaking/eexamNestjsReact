import React from "react";
import { Form, Accordion, Card, Button } from "react-bootstrap";

const questionUpload = ({
  categories,
  categoryRef,
  handleChange,
  submitHandler,
  formErrors,
}) => {
  return (
    <Accordion className="mt-3">
      <Accordion.Toggle as={Card.Header} eventKey="0">
        <h3> Upload by Excel file</h3>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0">
        <Form className="mt-2" onSubmit={submitHandler}>
          <Form.Group controlId="formGridCategory">
            <Form.Label>Question Category</Form.Label>
            <Form.Control
              as="select"
              name="category"
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
          <Form.Group>
            <Form.Label>Upload an excel file</Form.Label>
            <input
              type="file"
              name="file"
              className={"form-control-file"}
              onChange={handleChange}
            />
          </Form.Group>
          <Button type="submit" className="btn-submit">
            Submit
          </Button>
        </Form>
      </Accordion.Collapse>
    </Accordion>
  );
};

export default questionUpload;
