import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCategory } from "../../store/category";
import {
  getQuestionLoader,
  getQuestionByCategoryLoader,
} from "../../store/question";
import {
  Toast,
  ListGroup,
  Badge,
  Form,
  Pagination,
  Alert,
  Button,
  FormCheck,
  Row,
  Col,
} from "react-bootstrap";

class Exam extends Component {
  constructor(props) {
    super(props);
    //this.inputRef = React.createRef(null);
    this.state = {
      id: null,
      checkedQuestionIds: [],
      checkedQuestions: [],
      toogleChecked: false,
    };
  }

  componentDidMount() {
    this.props.onFetchCategoryLoader();
    this.props.onGetQuestionLoader();
  }
  slectedQuestion = [];
  checkHandleChange = (e) => {
    const isChecked = e.target.checked;
    const value = e.target.value;
    const [title, qText] = e.target.name.split("*_*");
    //console.log(e.target.value);
    // this.setState({
    //   checkedQuestionIds: [...this.state.checkedQuestionIds, e.target.value],
    // });
    this.setState((preState) => {
      if (isChecked) {
        preState.checkedQuestionIds.push(value);
        preState.checkedQuestions.push({ title, qText });
      } else {
        preState.checkedQuestionIds = preState.checkedQuestionIds.filter(
          (v) => v !== value
        );
        preState.checkedQuestions = preState.checkedQuestions.filter(
          (v) => v.title !== title
        );
      }
    });
  };

  handleChange = (e) => {
    e = e.target;
    this.props.onGetQuestionByCategoryLoader(e.value);
    this.setState({
      id: e.value,
    });
  };

  render() {
    return (
      <>
        <Row>
          <Col lg={4}></Col>
          <Col lg={8}>
            <Row>
              <Col lg={4}>
                <Toast
                  //show={this.state.toastShow}
                  // onClose={() => {
                  //   this.setState({ toastShow: false });
                  // }}
                  className="mt-3"
                >
                  <Toast.Header variant="success">
                    <strong className="m-auto">Filter</strong>
                  </Toast.Header>
                  <Toast.Body>
                    <Form.Group controlId="formGridParent">
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        as="select"
                        name="categpryId"
                        onChange={this.handleChange}
                      >
                        {this.props.category.categories.map((value) => {
                          let categorySlug = value.slug.replace(/_/g, " / ");
                          return (
                            <option value={value._id}>{categorySlug}</option>
                          );
                        })}
                      </Form.Control>
                    </Form.Group>
                  </Toast.Body>
                </Toast>
              </Col>
              <Col lg={4}>
                <Toast
                  //show={this.state.toastShow}
                  // onClose={() => {
                  //   this.setState({ toastShow: false });
                  // }}
                  className="mt-3"
                >
                  <Toast.Header variant="success">
                    <strong className="m-auto">
                      Selected Questions Preveiw
                    </strong>
                  </Toast.Header>
                  <Toast.Body>
                    {this.state.toogleChecked && (
                      <ListGroup className="my-2">
                        {this.state.checkedQuestionIds.map(
                          (question, index) => (
                            <ListGroup.Item key={index} variant={"success"}>
                              {/* <Form.Check
                    inline
                    type="checkbox"
                    value={question._id}
                    onChange={this.checkHandleChange}
                    //checked={this.state.isChecked}
                    //name="questions"
                    //ref={this.inputRef}
                  /> */}
                              {`${index + 1}. ${
                                this.state.checkedQuestions[index].title
                              } --> ${
                                this.state.checkedQuestions[index].qText
                              }`}
                            </ListGroup.Item>
                          )
                        )}
                      </ListGroup>
                    )}
                  </Toast.Body>
                </Toast>
              </Col>
            </Row>

            {
              <Alert variant={"primary"} className="text-center">
                Total number is : {this.props.question.questions.length}
              </Alert>
            }
            <Button
              onClick={() => {
                this.setState({ toogleChecked: !this.state.toogleChecked });
              }}
            >
              Submit
            </Button>
            {
              <FormCheck ref={this.inputRef}>
                <ListGroup className="my-2">
                  {this.props.question.questions.map((question, index) => (
                    <ListGroup.Item
                      key={index}
                      variant={index % 2 === 0 ? "dark" : "light"}
                    >
                      <Form.Check
                        inline
                        type="checkbox"
                        value={question._id}
                        onChange={this.checkHandleChange}
                        name={question.title + "*_*" + question.qText}
                        //checked={this.state.isChecked}
                        //name="questions"
                        //ref={this.inputRef}
                      />
                      {`${index + 1}. ${question.title} --> ${question.qText}`}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </FormCheck>
            }
          </Col>
        </Row>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchCategoryLoader: () => dispatch(fetchCategory()),
    onGetQuestionLoader: () => dispatch(getQuestionLoader()),
    onGetQuestionByCategoryLoader: (id) =>
      dispatch(getQuestionByCategoryLoader(id)),
  };
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    question: state.question,
    category: state.category,
    api: state.api,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Exam);
