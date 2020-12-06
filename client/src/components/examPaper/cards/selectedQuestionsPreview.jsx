import React from "react";
import { useSelector } from "react-redux";
import ExamCard from "./card/card";
import { ListGroup } from "react-bootstrap";

const SelectedQuestionsPreview = ({
  toogleChecked,
  checkedQuestionIds,
  checkedQuestions,
}) => {
  const selectedQuestions = useSelector((state) => state.examPaper.questions);

  return (
    <ExamCard header="Selected Questions Preview" showHeader={false}>
      {
        <ListGroup className="my-2">
          {selectedQuestions.map((question, index) => (
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
              {`${index + 1}. ${question.title} --> ${question.qText}`}
            </ListGroup.Item>
          ))}
        </ListGroup>
      }
    </ExamCard>
  );
};

export default SelectedQuestionsPreview;
