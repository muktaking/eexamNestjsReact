import React from "react";
import Row from "react-bootstrap/Row";
import MiniCards from "../../components/dashboard/miniCards/miniCards";
import BigCards from "../../components/dashboard/bigCards/bigCards";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { dashboardStudent } from "../../store/dashboard";

const Dashboard = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SITE_URL + "/dashboard")
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: dashboardStudent.type, payload: response.data });
        }
      })
      .catch((e) => console.log(e));
  });

  return (
    <>
      <Row className="pt-md-3 mt-md-3 mb-2">
        <MiniCards />
        {/* <Col sm={6} className="p-2"></Col> */}
      </Row>
      <div className="pt-md-2 mt-md-2 mb-2">
        <BigCards />
      </div>
    </>
  );
};

export default Dashboard;
