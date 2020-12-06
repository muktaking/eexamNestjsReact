import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, ListGroup, Alert } from "react-bootstrap";

class Result extends Component {
  state = {};
  render() {
    const {
      examResult,
      totalMark,
      totalScore,
      totalScorePercentage,
      error,
    } = this.props.exams;
    console.log(error);
    return (
      <div>
        {error && (
          <Alert variant={"danger"} className="m-5 text-center">
            {error}
          </Alert>
        )}
        {examResult && (
          <div>
            <Card className="mt-3">
              <Card.Header as="h5" className="text-center">
                Result
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    Your Score: {totalScore.toFixed(2)} out of{" "}
                    {totalMark.toFixed(2)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Your Total Score Percentage: {totalScorePercentage} %
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>

            <Card className="mt-3">
              <Card.Header as="h5" className="text-center">
                Explanation
              </Card.Header>
              <Card.Body>
                {examResult.map((item, index) => (
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      {index + 1 + ". " + item.qText}{" "}
                      {typeof item.result.stemResult === "number" && ( // stemResult type number means it is sba question
                        <p>Right Answer is: {item.result.stemResult}</p>
                      )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <ListGroup variant="flush" className="pl-3">
                        {item.stems.map((stem, ind) => {
                          if (typeof item.result.stemResult === "number")
                            return (
                              <>
                                <ListGroup.Item>
                                  {ind + 1}. {stem.qStem}
                                </ListGroup.Item>
                                <ListGroup.Item className="ml-3">
                                  Explanation is : {stem.fbStem}
                                </ListGroup.Item>
                              </>
                            );
                          else
                            return (
                              <>
                                <ListGroup.Item>
                                  {ind + 1}. {stem.qStem}
                                </ListGroup.Item>
                                <ListGroup.Item
                                  className={
                                    (item.result.stemResult[ind] === true
                                      ? "bg-success"
                                      : "bg-danger") + " text-light ml-3"
                                  }
                                >
                                  {/* {item.result.stemResult[ind] === true
                                  ? "Right"
                                  : "Wrong"} */}
                                  This Statement is:{" "}
                                  {stem.aStem === "1" ? "True" : "False"}
                                  <br />
                                  Explanation is : {stem.fbStem}
                                </ListGroup.Item>
                              </>
                            );
                        })}
                      </ListGroup>
                    </ListGroup.Item>
                  </ListGroup>
                ))}
              </Card.Body>
            </Card>
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {};
};
const mapStateToProps = (state) => {
  return {
    exams: state.exams,
    //   auth: state.auth,
    //   category: state.category,
    //   api: state.api,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Result);
