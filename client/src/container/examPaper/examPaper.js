import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Toast,
  ListGroup,
  Badge,
  Form,
  Alert,
  Button,
  FormCheck,
  Row,
  Col,
  Card,
  Modal,
} from "react-bootstrap";
import Filter from "../../components/examPaper/cards/filter";
import ExamSpec from "../../components/examPaper/cards/examSpec";
import SelectedQuestionsPreview from "../../components/examPaper/cards/selectedQuestionsPreview";
import Pagination from "../../components/shared/pagination/pagination";
import { paginate } from "../../utils/paginate";
import { fetchCategory } from "../../store/category";
import {
  getQuestionLoader,
  getQuestionByCategoryLoader,
} from "../../store/question";
import { selectedQuestionsLoader } from "../../store/examPaper";

class ExamPaper extends Component {
  constructor(props) {
    super(props);
    //this.inputRef = React.createRef(null);
    this.state = {
      show: false,
      id: null,
      //toogle: false,
      checkedQuestionIds: [],
      checkedQuestions: [],
      //toogleChecked: false,
      pageSize: 10,
      currentPage: 1,
    };
  }

  componentDidMount() {
    this.props.onFetchCategoryLoader();
    this.props.onGetQuestionLoader();
  }

  handleShow = () => {
    this.setState({ show: true });
  };
  handleClose = () => {
    this.setState({ show: false });
  };

  checkHandleChange = (e) => {
    const isChecked = e.target.checked;
    const value = e.target.value;
    const [title, qText] = e.target.name.split("*_*");
    // this.setState({
    //   checkedQuestionIds: [...this.state.checkedQuestionIds, e.target.value],
    // });

    this.setState((preState) => {
      if (isChecked) {
        preState.checkedQuestionIds = [...preState.checkedQuestionIds, value];
        preState.checkedQuestions = [
          ...preState.checkedQuestions,
          { title, qText },
        ];
        //preState.checkedQuestions.push({ title, qText });
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
  onPageHandler = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const questions = paginate(
      this.props.question.questions,
      this.state.currentPage,
      this.state.pageSize
    );
    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Selected Questions Preview</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <SelectedQuestionsPreview
              //toogleChecked={this.toogleChecked}
              checkedQuestions={this.state.checkedQuestions}
              checkedQuestionIds={this.state.checkedQuestionIds}
            />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Row>
          <Col lg={4}>
            <Alert variant={"primary"} className="text-center mt-3">
              Total number of question is :
              {this.props.question.questions.length}
            </Alert>
            <Button onClick={this.handleShow}>Selected Questions</Button>
            <Filter
              handleChange={this.handleChange}
              categories={this.props.category.categories}
            />
            <ExamSpec categories={this.props.category.categories} />
            {/* <SelectedQuestionsPreview
              //toogleChecked={this.toogleChecked}
              checkedQuestions={this.state.checkedQuestions}
              checkedQuestionIds={this.state.checkedQuestionIds}
            /> */}
          </Col>
          <Col lg={8}>
            {
              <FormCheck>
                <ListGroup className="my-2">
                  {questions.map((question, index) => (
                    <ListGroup.Item
                      key={question._id}
                      variant={index % 2 === 0 ? "dark" : "light"}
                    >
                      <Form.Check
                        inline
                        type="checkbox"
                        value={question._id}
                        onChange={this.checkHandleChange}
                        name={question.title + "*_*" + question.qText}
                        defaultChecked={this.state.checkedQuestionIds.includes(
                          question._id
                        )}
                        //checked={this.state[question._id] ? true : false}
                        //name="questions"
                        //ref={this.inputRef}
                      />
                      {`${index + 1}. ${question.title} --> ${question.qText}`}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </FormCheck>
            }
            <Pagination
              itemsCount={this.props.question.questions.length}
              pageSize={this.state.pageSize}
              currentPage={this.state.currentPage}
              onPageHandler={this.onPageHandler}
            />

            <Button
              onClick={() => {
                //this.setState({ toogleChecked: !this.state.toogleChecked });
                this.props.onSelectedQuestionsLoader(
                  this.state.checkedQuestions,
                  this.state.checkedQuestionIds
                );
              }}
            >
              Add to Preview Cart
            </Button>
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
    onSelectedQuestionsLoader: (questions, ids) =>
      dispatch(selectedQuestionsLoader(questions, ids)),
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

export default connect(mapStateToProps, mapDispatchToProps)(ExamPaper);
