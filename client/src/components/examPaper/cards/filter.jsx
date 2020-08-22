import React from "react";
import ExamCard from "./card/card";
import { Form } from "react-bootstrap";

const filter = ({ handleChange, categories }) => {
  return (
    <ExamCard header="Filter" showHeader={true}>
      <Form.Group controlId="formGridParent">
        <Form.Label>Category</Form.Label>
        <Form.Control as="select" name="categoryId" onChange={handleChange}>
          {categories.map((value) => {
            let categorySlug = value.slug.replace(/_/g, " / ");
            return <option value={value._id}>{categorySlug}</option>;
          })}
        </Form.Control>
      </Form.Group>
    </ExamCard>
  );
};

export default filter;
