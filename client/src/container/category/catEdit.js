import React, { useState } from "react";
import { Accordion, Spinner, Form, Button, Card } from "react-bootstrap";

const CategoryForm = (props) => {
  const {
    submitHandler,
    handleChange,
    formErrors,
    errorMessage,
    categories,
    name,
    slug,
    category,
  } = props;

  return (
    <>
      <h3>Edit " {name} " Category</h3>
      <Form
        className="mt-2"
        onSubmit={submitHandler}
        enctype="multipart/form-data"
      >
        <div className="text-white mb-2 bg-danger">{errorMessage}</div>
        <Form.Group controlId="formGroupCategoryName">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Category Name"
            name="name"
            value={category.name}
            onChange={handleChange}
          />
          {formErrors.name.length > 0 && (
            <span className="errorMessage">{formErrors.name}</span>
          )}
        </Form.Group>

        <Form.Group controlId="formGridParent">
          <Form.Label>Parent Category</Form.Label>
          <Form.Control as="select" name="parentId" onChange={handleChange}>
            <option value="Top">Top</option>
            {categories.map((value) => {
              let categorySlug = value.slug.replace(/_/g, " / ");
              return (
                <option value={value._id} selected={value.slug === slug}>
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
            value={category.order}
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
            value={category.description}
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
      </Form>
    </>
  );
};

export default CategoryForm;
