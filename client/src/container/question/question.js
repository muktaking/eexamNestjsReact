import React, { Component } from "react";
import validator from "validator";
import axios from "axios";
import { connect } from "react-redux";
import { Toast, Button, Alert, ListGroup, Badge } from "react-bootstrap";

import QuestionForm from "./questionView";
import errorHandler from "../../utils/errorHandler";

import { fetchCategory } from "../../store/category";
import QuestionUploadForm from "./questionsUpload";
import {
  createQuestionLoader,
  uploadQuestionLoader,
} from "../../store/question";

const centeredStyle = {
  // styling to display server response in middle of screen
  position: "fixed",
  top: "50%",
  left: "50%",
  /* bring your own prefixes */
  transform: "translate(-50%, -50%)",
  zIndex: "1000",
};

const formValid = ({ formErrors, rest }) => {
  //to check if form fields are null or contain error
  let valid = true;
  let error = "";
  Object.values(formErrors).forEach((v) => {
    v.length > 0 && (valid = false) && (error = v);
    v.length > 0 && (error = v);
  });

  Object.values(rest).forEach((v) => {
    v === (null || "") && (valid = false);
  });
  return { valid, error }; // valid: is it valid ; error: what is the error message
};

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false, // controlls spinner state
      id: null, // need to pass id in edit or delete category section
      title: "", // used in editCategory component to display the category name in heading
      category: "Top",
      qType: "matrix",
      qText: "",
      stemAmount: [1, 2, 3, 4, 5],
      uploadedExcelQuestion: null,
      response: null, // to display response message
      responseClass: "success", // depends on response type
      showEditCategoryComponent: false, // show or hide editCategory component
      toastShow: true,
      formErrors: {
        // for storing form feilds error on handle change
        title: "",
        category: "",
        qType: "",
        qText: "",
        stem: "",
      },
    };
    this.categoryRef = React.createRef(null);
  }

  hideResponse = () => {
    // hide the response message
    this.setState({ response: null });
  };
  resetState = () => {
    this.setState({
      title: "",
      category: "Top",
      qType: "matrix",
      qText: "",
      stemAmount: [1, 2, 3, 4, 5],
      aStemSba: null,
    });
    this.state.stemAmount.map((v) => {
      this.setState({
        ["qStem" + v]: "",
        ["aStem" + v]: null,
        ["fbStem" + v]: "",
      });
    });
  };

  handleChange = (e) => {
    const { name, value, files } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case "title":
        formErrors.title = validator.isLength(value, { min: 1, max: 200 })
          ? ""
          : "Title should not be emty, more than 200 charecters";
        break;
      case "qText":
        formErrors.qText = validator.isLength(value, {
          min: 1,
          max: 500,
        })
          ? ""
          : "Question Text should not be empty or maximum 500 characters";
        break;
      case "category":
        formErrors.category =
          value === "Top" || validator.isMongoId(value)
            ? ""
            : "Category is not valid";
        break;
      case "qType":
        formErrors.qType = validator.isIn(value, ["matrix", "sba"])
          ? ""
          : "Question Type is not valid";
        break;
      default:
        break;
    }

    if (/((qStem)|(fbStem))\d{1,2}/.test(name)) {
      formErrors.stem = validator.isLength(value, {
        max: 200,
      })
        ? ""
        : "qStem or fbStem should not be More than 200";
    } else if (/(aStem\d{1,2})|(aStemSba)/.test(name)) {
      console.log(value);
      formErrors.stem = validator.isLength(value, {
        max: 1,
      })
        ? ""
        : "aStem is invalid";
    }

    this.setState({
      formErrors: formErrors,
      [name]: files ? files[0] : value,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    const { title, qType, qText, formErrors, aStemSba } = this.state;
    const category = this.categoryRef.current.value;
    const rest = { title, category, qType, qText };
    const stem = [];

    if (qType === "sba" && !(aStemSba && this.state["qStem" + aStemSba])) {
      this.setState({
        formErrors: {
          ...formErrors,
          stem: `${aStemSba} no. stem can not be emty`,
        },
      });
    } else {
      this.state.stemAmount.map((v) => {
        if (qType === "sba" && this.state["qStem" + v]) {
          stem.push({
            qStem: this.state["qStem" + v],
            aStem: this.state.aStemSba,
            fbStem: this.state["fbStem" + v],
          });
        } else if (this.state["qStem" + v] && this.state["aStem" + v]) {
          stem.push({
            qStem: this.state["qStem" + v],
            aStem: this.state["aStem" + v],
            fbStem: this.state["fbStem" + v],
          });
        }
      });
    }

    const { valid, error } = formValid({ rest, formErrors });

    if (valid && stem.length !== 0) {
      this.resetState();
      this.props.onCreateQuestionLoader({ ...rest, stem });
    } else {
      this.setState({
        response:
          "Please fill form corectly" +
          (error ? " __ " + error.toUpperCase() + " __" : ""),
        responseClass: "danger",
      });
      setTimeout(this.hideResponse, 2000);
    }
  };

  uploadHandler = (e) => {
    e.preventDefault();
    const { file } = this.state;
    const category = this.categoryRef.current.value;
    const data = new FormData();
    data.append("file", file);
    data.append("category", category);
    axios
      .post("http://localhost:4000/questions/files", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        this.setState({
          uploadedExcelQuestion: response.data,
          response: "Successfully Updated ",
          responseClass: "success",
        });
        setTimeout(this.hideResponse, 2000);
      })
      .catch((error) => {
        console.log(error);
        const errorResponse = errorHandler(error);
        this.setState({
          response: errorResponse,
          responseClass: "danger",
        });
        setTimeout(this.hideResponse, 2000);
      });
  };

  componentDidMount() {
    this.props.onFetchCategoryLoader();
  }
  render() {
    let stem = {};
    this.state.stemAmount.map((v) => {
      stem = {
        ...stem,
        ["qStem" + v]: this.state["qStem" + v],
        ["aStem" + v]: this.state["aStem" + v],
        ["fbStem" + v]: this.state["bStem" + v],
      };
    });

    const { title, category, qType, qText, aStemSba } = this.state;
    return (
      <>
        {this.state.uploadedExcelQuestion && this.state.toastShow && (
          <Toast
            show={this.state.toastShow}
            onClose={() => {
              this.setState({ toastShow: false });
            }}
            className="mt-3"
          >
            <Toast.Header variant="success">
              <strong className="m-auto">
                Questions Uploaded Successfully.
              </strong>
            </Toast.Header>
            <Toast.Body>
              <ListGroup>
                {this.state.uploadedExcelQuestion.map((question, index) => (
                  <ListGroup.Item key={index}>
                    {`${index + 1}. ${question.title}`}{" "}
                    <Badge variant="dark" className="ml-2">
                      edit
                    </Badge>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Toast.Body>
          </Toast>
        )}
        {this.props.api.result && this.state.toastShow && (
          <Toast
            show={this.state.toastShow}
            onClose={() => {
              this.setState({ toastShow: false });
            }}
            className="mt-3"
          >
            <Toast.Header variant="success">
              <strong className="mr-auto">
                Question Created Successfully.
              </strong>
            </Toast.Header>
            <Toast.Body>
              Want to Edit the "
              {this.props.api.result ? this.props.api.result.title : ""}"
              <Button size="sm" variant="info" className="mt-2 ml-3">
                Question
              </Button>
            </Toast.Body>
          </Toast>
        )}

        {this.state.response && (
          <Alert
            variant={this.state.responseClass}
            className="text-center"
            style={centeredStyle}
          >
            {this.state.response}
          </Alert>
        )}

        <QuestionForm
          submitHandler={this.submitHandler}
          categories={this.props.category.categories}
          question={{
            title,
            category,
            qType,
            qText,
            stem: { ...stem, aStemSba },
          }}
          handleChange={this.handleChange}
          categoryRef={this.categoryRef}
          formErrors={this.state.formErrors}
        />

        {/* Upload start here */}

        <QuestionUploadForm
          categories={this.props.category.categories}
          formErrors={this.state.formErrors}
          submitHandler={this.uploadHandler}
          handleChange={this.handleChange}
        />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchCategoryLoader: () => dispatch(fetchCategory()),
    onCreateQuestionLoader: (data) => dispatch(createQuestionLoader(data)),
    onUploadQuestionLoader: (data) => dispatch(uploadQuestionLoader(data)),
  };
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    category: state.category,
    api: state.api,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
