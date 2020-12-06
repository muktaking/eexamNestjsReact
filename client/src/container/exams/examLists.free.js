import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAllFreeExamsLoader, resetExamResult } from "../../store/exams";

class ExamLists extends Component {
  state = {};
  componentDidMount() {
    this.props.onGetAllFreeExamsLoader();
    this.props.onResetExamResult();
  }
  type = [
    "Assignment",
    "Weekly",
    "Monthly",
    "Assesment",
    "Term",
    "Test",
    "Final",
  ];
  render() {
    return (
      <>
        <Row className="mt-3 ml-3">
          <Col lg={3}></Col>
          <Col lg={9}>
            <Row>
              {this.props.exams.exams.map((exam) => (
                <Col lg={4} className="mb-3">
                  <Card key={exam._id}>
                    {/* <Card.Img
                      variant="top"
                      src="https://picsum.photos/286/180"
                    /> */}
                    <Card.Body>
                      <Card.Title>{exam.title}</Card.Title>
                      <Card.Subtitle className="text-light">
                        <Badge className="ml-1 p-1 bg-danger">
                          {this.type[+exam.type]}
                        </Badge>
                        {exam.categoryType &&
                          exam.categoryType.map((category) => (
                            <Badge className="ml-1 p-1 bg-info">
                              {category.name}
                            </Badge>
                          ))}
                      </Card.Subtitle>
                      <Card.Text className="mt-2">
                        {exam.description}
                        <hr />
                        Created At: {moment(exam.createdAt).calendar()}
                      </Card.Text>
                      <Link to={"/free/" + exam._id}>Enter to Exam</Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetAllFreeExamsLoader: () => dispatch(getAllFreeExamsLoader()),
    onResetExamResult: () => dispatch({ type: resetExamResult.type }),
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

export default connect(mapStateToProps, mapDispatchToProps)(ExamLists);
