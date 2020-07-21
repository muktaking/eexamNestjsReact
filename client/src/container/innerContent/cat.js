import React, { useState } from "react";
import { Accordion, Spinner, Form, Button, Card } from "react-bootstrap";

const CategoryForm = (props) => {
  const {
    submitHandler,
    handleChange,
    formErrors,
    categories,
    name,
    //slug,
    selectOptionValueRef,
    category,
    showEditCategoryAccordionStateHandler,
  } = props;
  return (
    <Accordion className="mt-3" defaultActiveKey={name && "0"}>
      <Accordion.Toggle as={Card.Header} eventKey="0">
        <h3> {name ? "Edit " + name : "Create A New"} Category</h3>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0">
        <Form
          className="mt-2"
          onSubmit={submitHandler}
          enctype="multipart/form-data"
        >
          <Form.Group controlId="formGroupCategoryName">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Category Name"
              name="name"
              value={category ? category.name : null}
              onChange={handleChange}
            />
            {formErrors.name.length > 0 && (
              <span className="errorMessage">{formErrors.name}</span>
            )}
          </Form.Group>

          <Form.Group controlId="formGridParent">
            <Form.Label>Parent Category</Form.Label>
            <Form.Control
              as="select"
              name="parentId"
              onChange={handleChange}
              ref={selectOptionValueRef}
            >
              <option value="Top">Top</option>
              {categories.map((value) => {
                let categorySlug = value.slug.replace(/_/g, " / ");
                return (
                  <option
                    value={value._id}
                    selected={category && value._id === category.parentId}
                  >
                    {categorySlug}
                  </option>
                );
              })}
            </Form.Control>
            {formErrors.parentId.length > 0 && (
              <span className="errorMessage">{formErrors.parentId}</span>
            )}
          </Form.Group>

          <Form.Group controlId="formGroupCategoryOrder">
            <Form.Label>Category Order</Form.Label>
            <Form.Control
              type="text"
              name="order"
              value={category && category.order}
              placeholder="e.g. 5 <..Order makes priority. Lower value higher order..>"
              onChange={handleChange}
            />
            {formErrors.order.length > 0 && (
              <span className="errorMessage">{formErrors.order}</span>
            )}
          </Form.Group>

          <Form.Group controlId="formGroupCategoryDes">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="textarea"
              placeholder="Enter short description"
              name="description"
              value={category && category.description}
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
          </Form.Group>

          <Button type="submit" className="btn-submit">
            Submit
          </Button>
          {name && (
            <Button
              variant="success"
              className="ml-3"
              onClick={showEditCategoryAccordionStateHandler}
            >
              Cancel
            </Button>
          )}
        </Form>
      </Accordion.Collapse>
    </Accordion>
  );
};

export default CategoryForm;
