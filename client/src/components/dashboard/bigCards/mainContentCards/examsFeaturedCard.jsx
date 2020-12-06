import React from "react";
import { useSelector } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import BigCard from "../bigCard/bigCard";
import ExamList from "../../../shared/examList/examList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ExamsFeaturedCard = () => {
  const featuredExams = useSelector((state) => state.dashboard.featuredExams);

  return (
    <BigCard
      header="Featured Exams"
      headerColor={"primary"}
      showDatePicker={false}
    >
      <ListGroup variant="flush">
        {featuredExams.map((exam, index) => (
          <ListGroup.Item className="border-0">
            <ExamList
              id={exam._id}
              title={exam.title}
              description={exam.description}
              createdAt={exam.createdAt}
              type={exam.type}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </BigCard>
  );
};

export default ExamsFeaturedCard;
