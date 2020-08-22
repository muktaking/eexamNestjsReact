import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import BigCard from "../bigCard/bigCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ExamsFeaturedCard extends React.Component {
  render() {
    return (
      <BigCard
        header="Featured Exams"
        headerColor={"primary"}
        showDatePicker={false}
      >
        <ListGroup variant="flush">
          <ListGroup.Item className="border-0">
            <ListGroup horizontal className="border-0">
              <ListGroup.Item className="border-0">
                Pulmonology of {"Medicine"} Faculty {"(Midterm)"} Starts On:{" "}
                {"(21.12.29)"}
              </ListGroup.Item>
              <ListGroup.Item className="border-0">
                {["warning", "warning", "warning", "warning", "dark"].map(
                  value => {
                    return (
                      <FontAwesomeIcon
                        icon={"star"}
                        size="xs"
                        className={"text-" + value + " mr-1"}
                      />
                    );
                  }
                )}
              </ListGroup.Item>
            </ListGroup>
          </ListGroup.Item>

          <ListGroup.Item>
            <ListGroup horizontal className="border-0">
              <ListGroup.Item className="border-0">
                Pulmonology of {"Medicine"} Faculty {"(Midterm)"} Starts On:{" "}
                {"(21.12.29)"}
              </ListGroup.Item>
              <ListGroup.Item className="border-0">
                {["warning", "warning", "warning", "warning", "dark"].map(
                  value => {
                    return (
                      <FontAwesomeIcon
                        icon={"star"}
                        size="xs"
                        className={"text-" + value + " mr-1"}
                      />
                    );
                  }
                )}
              </ListGroup.Item>
            </ListGroup>
          </ListGroup.Item>
          <ListGroup.Item>
            <ListGroup horizontal className="border-0">
              <ListGroup.Item className="border-0">
                Pulmonology of {"Medicine"} Faculty {"(Midterm)"} Starts On:{" "}
                {"(21.12.29)"}
              </ListGroup.Item>
              <ListGroup.Item className="border-0">
                {["warning", "warning", "warning", "warning", "dark"].map(
                  value => {
                    return (
                      <FontAwesomeIcon
                        icon={"star"}
                        size="xs"
                        className={"text-" + value + " mr-1"}
                      />
                    );
                  }
                )}
              </ListGroup.Item>
            </ListGroup>
          </ListGroup.Item>
          <ListGroup.Item>
            <ListGroup horizontal className="border-0">
              <ListGroup.Item className="border-0">
                Pulmonology of {"Medicine"} Faculty {"(Midterm)"} Starts On:{" "}
                {"(21.12.29)"}
              </ListGroup.Item>
              <ListGroup.Item className="border-0">
                {["warning", "warning", "warning", "warning", "dark"].map(
                  value => {
                    return (
                      <FontAwesomeIcon
                        icon={"star"}
                        size="xs"
                        className={"text-" + value + " mr-1"}
                      />
                    );
                  }
                )}
              </ListGroup.Item>
            </ListGroup>
          </ListGroup.Item>
        </ListGroup>
      </BigCard>
    );
  }
}

export default ExamsFeaturedCard;
