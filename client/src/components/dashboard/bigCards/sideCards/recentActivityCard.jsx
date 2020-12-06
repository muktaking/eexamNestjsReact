import React from "react";
import moment from "moment";
import { MdInfo } from "react-icons/md";
import ListGroup from "react-bootstrap/ListGroup";
import BigCard from "../bigCard/bigCard";
import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux";

const SideCard = (props) => {
  const userExamStat = useSelector((state) => state.dashboard.userExamStat);
  const examTitles = userExamStat ? userExamStat.examTitles : [];
  const stat = userExamStat ? userExamStat.stat : [];

  return (
    <BigCard
      header="Recent Activity"
      headerColor={"warning"}
      showDatePicker={false}
    >
      <ListGroup as="ul" variant="flush">
        {examTitles &&
          examTitles.map((exam, index) => {
            if (index < 6)
              return (
                <ListGroup.Item as="li" className="">
                  {/* <Badge variant="info" className="rounded p-1"> */}
                  <MdInfo size="1.5em" color="magenta" />
                  {/* </Badge> */}
                  <Badge variant="light">{exam.title}</Badge>Exam attempted{" "}
                  <Badge variant="danger">{stat[index].attemptNumbers}</Badge>{" "}
                  times.
                  <p className="text-muted pl-3" style={{ fontSize: "80%" }}>
                    last attempt{" "}
                    {moment(stat[index].lastAttemptTime)
                      .startOf("day")
                      .fromNow()}
                  </p>
                </ListGroup.Item>
              );
          })}
      </ListGroup>
    </BigCard>
  );
};

export default SideCard;
