import React from "react";
import CategoryForm from "./categoryForm";

const fields = [
  {
    name: "name",
    placeholder: "Category Name",
    error: formErrors.name,
    label: "Category Name",
  },
  {
    name: "parentId",
    error: formErrors.parentId,
    label: "Parent Category",
    selectOptions,
  },
];

class Category extends Component {
  state = {};
  render() {
    return <CategoryForm />;
  }
}

export default Category;
