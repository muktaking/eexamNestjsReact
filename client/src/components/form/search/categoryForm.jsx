import React from "react";
import Form from "react-bootstrap/Form";
import formGroup from "./formGroup";

// const fields = [
//   { name: "name", type: "", placholder: "", error: "" },
//   { name: "description", type: "", placholder: "", error: "" },
//   { name: "order", type: "", placholder: "", error: "" },
//   { name: "image", type: "", placholder: "", error: "" },
// ];

const categoryForm = (props) => {
  return (
    <Form>
      {props.fields.map((v, i) => {
        <formGroup
          key={i}
          controlId={v.name}
          name={v.name}
          type={v.type || "text"}
          placeholder={v.placeholder}
          error={v.error}
          onChange={props.onChange}
          style={v.style}
          label={v.label}
          selectOptions={v.type === "select" ? v.selectOptions : ""}
        />;
      })}
    </Form>
  );
};

export default categoryForm;
