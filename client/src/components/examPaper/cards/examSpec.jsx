import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import validator from "validator";
import ExamCard from "./card/card";
import { Form, Button } from "react-bootstrap";
import { postExamProfile } from "../../../store/examPaper";

const ExamSpec = ({ categories }) => {
  const dispatch = useDispatch();
  const selectedQuestionIds = useSelector((state) => state.examPaper.ids);
  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Required";
    } else if (!validator.isLength(values.title, { min: 3, max: 20 })) {
      errors.title = "Title should be between 3-20 characters";
    }
    if (!values.description) {
      errors.description = "Required";
    } else if (!validator.isLength(values.description, { min: 3, max: 50 })) {
      errors.description = "Description should be between 3-50 characters";
    }
    if (!values.singleQuestionMark) {
      errors.singleQuestionMark = "Required";
    } else if (!validator.isInt(values.singleQuestionMark)) {
      errors.singleQuestionMark =
        "Single Question Mark should be Integer value";
    }
    if (!values.singleStemMark) {
      errors.singleStemMark = "Required";
    } else if (!validator.isNumeric(values.singleStemMark)) {
      errors.singleStemMark = "single Stem Mark should be Numeric value";
    }
    if (!values.penaltyMark) {
      errors.penaltyMark = "Required";
    } else if (!validator.isNumeric(values.penaltyMark)) {
      errors.penaltyMark = "penalty Mark should be Numeric value";
    }
    if (!values.timeLimit) {
      errors.timeLimit = "Required";
    } else if (!validator.isInt(values.timeLimit)) {
      errors.timeLimit = "Timelimit Mark should be Interger Value";
    }
    console.log(errors);
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      type: "0",
      categoryType: [],
      singleQuestionMark: "1",
      singleStemMark: "0.2",
      penaltyMark: "0",
      timeLimit: "40",
    },
    validate,
    onSubmit: (values) => {
      if (selectedQuestionIds.length > 0) {
        dispatch(postExamProfile(values, selectedQuestionIds));
      } else {
        alert("Their is no selected Question");
      }
    },
  });
  return (
    <ExamCard header="Exam Specification" showHeader={true}>
      <Form>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            name="title"
            onChange={formik.handleChange}
          />
        </Form.Group>
        {formik.errors.title ? (
          <div className="alert alert-danger">{formik.errors.title}</div>
        ) : null}
        <Form.Group controlId="type">
          <Form.Label>Exam Type</Form.Label>
          <Form.Control as="select" name="type" onChange={formik.handleChange}>
            <option value="0">Assignment</option>
            <option value="1">Weekly</option>
            <option value="2">Monthly</option>
            <option value="3">Assesment</option>
            <option value="4">Term</option>
            <option value="5">Test</option>
            <option value="0">Final</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="categoryType">
          <Form.Label>Category Type</Form.Label>
          <Form.Control
            as="select"
            multiple
            name="categoryType"
            onChange={formik.handleChange}
            //value={categories[0] && categories[0]._id}
          >
            {categories.map((value) => {
              //console.log(categories[0]._id);
              let categorySlug = value.slug.replace(/_/g, " / ");
              return <option value={value._id}>{categorySlug}</option>;
            })}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="textarea"
            placeholder="description"
            name="description"
            onChange={formik.handleChange}
          />
        </Form.Group>
        {formik.errors.description ? (
          <div className="alert alert-danger">{formik.errors.description}</div>
        ) : null}
        <Form.Group controlId="singleQuestionMark">
          <Form.Label>Single Question Mark</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter single Question Mark"
            name="singleQuestionMark"
            onChange={formik.handleChange}
          />
        </Form.Group>
        {formik.errors.singleQuestionMark ? (
          <div className="alert alert-danger">
            {formik.errors.singleQuestionMark}
          </div>
        ) : null}
        <Form.Group controlId="singleStemMark">
          <Form.Label>Single Stem Mark</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter single Stem Mark"
            name="singleStemMark"
            onChange={formik.handleChange}
          />
        </Form.Group>
        {formik.errors.singleStemMark ? (
          <div className="alert alert-danger">
            {formik.errors.singleStemMark}
          </div>
        ) : null}
        <Form.Group controlId="penaltyMark">
          <Form.Label>Penalty Mark</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter penalty Mark"
            name="penaltyMark"
            onChange={formik.handleChange}
          />
        </Form.Group>
        {formik.errors.penaltyMark ? (
          <div className="alert alert-danger">{formik.errors.penaltyMark}</div>
        ) : null}
        <Form.Group controlId="timeLimit">
          <Form.Label>Time Limit(Minutes)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Time Limit"
            name="timeLimit"
            onChange={formik.handleChange}
          />
        </Form.Group>
        {formik.errors.timeLimit ? (
          <div className="alert alert-danger">{formik.errors.timeLimit}</div>
        ) : null}
      </Form>
      <Button onClick={formik.handleSubmit}>Submit</Button>
    </ExamCard>
  );
};

export default ExamSpec;
