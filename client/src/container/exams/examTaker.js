import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Redirect } from "react-router-dom";
import _ from "lodash";
import Countdown from "react-countdown";
import { FaClock } from "react-icons/fa";
import { Row, Col, Button } from "react-bootstrap";

import { getExamByIdLoader, postExamByIdLoader } from "../../store/exams";
import QuestionView from "../../components/exams/question/question";
import Pagination from "../../components/shared/pagination/pagination";
import { paginate } from "../../utils/paginate";

class ExamTaker extends Component {
  state = {
    pageSize: 1,
    currentPage: 1,
    date: Date.now(),
    //answerIds: new Set(),
    timeTakenToComplete: 0,
    shouldEndExam: false,
  };
  answers = [];
  answerIds = new Set();
  onPageHandler = (page) => {
    this.setState({ currentPage: page });
  };
  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name.includes("_")) {
      const [id, index] = name.split("_");
      this.setState((preState) => {
        if (!preState[id]) preState[id] = [];
        preState[id][index - 1] = value;
        this.answerIds.add(id);
      });
    } else {
      this.setState((preState) => {
        preState[name] = [value];
        this.answerIds.add(name);
      });
    }
  };
  componentDidMount() {
    this.props.onGetExamByIdLoader(this.props.match.params.id);
  }

  render() {
    const questions = paginate(
      this.props.exams.questions,
      this.state.currentPage,
      this.state.pageSize
    );
    return (
      <>
        {this.props.exams.examResult && <Redirect to="/result" />}
        <Row className="mt-3">
          <Col></Col>
          <Col sm={4} className="text-dark text-center">
            <FaClock className="mr-2" size="2em" />
            <Countdown
              date={this.state.date + this.props.exams.timeLimit * 60 * 1000}
              onTick={(props) => {
                this.setState({ timeTakenToComplete: props.total });
              }}
              onComplete={() => {
                alert("Finished");
              }}
            />
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col lg={9}>
            {questions.map((question) => (
              <QuestionView
                key={question._id}
                question={question}
                handleChange={this.handleChange}
                defaultChecked={
                  this.state[question._id] ? this.state[question._id] : null
                }
              />
            ))}
          </Col>
          <Col lg={3}>
            <Row>
              <Col></Col>
              <Col>
                {" "}
                <Pagination
                  itemsCount={this.props.exams.questions.length}
                  pageSize={this.state.pageSize}
                  currentPage={this.state.currentPage}
                  onPageHandler={this.onPageHandler}
                />
              </Col>
              <Col>
                <Button
                  onClick={() => {
                    this.answerIds.forEach((id) => {
                      this.answers.push({
                        id: id,
                        stems: this.state[id],
                        type: _.find(
                          this.props.exams.questions,
                          (o) => o._id === id
                        ).qType,
                      });
                    });
                    this.props.onPostExamByIdLoader({
                      examId: this.props.match.params.id,
                      timeTakenToComplete:
                        this.props.exams.timeLimit * 60 * 1000 -
                        this.state.timeTakenToComplete,
                      answers: this.answers,
                    });
                  }}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col></Col>
          <Col sm={4} className="justify-content-center"></Col>
          <Col></Col>
        </Row>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetExamByIdLoader: (id) => dispatch(getExamByIdLoader(id)),
    onPostExamByIdLoader: (data) => dispatch(postExamByIdLoader(data)),
  };
};
const mapStateToProps = (state) => {
  return {
    exams: state.exams,
    //   auth: state.auth,
    //   category: state.category,
    //   api: state.api,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ExamTaker));
