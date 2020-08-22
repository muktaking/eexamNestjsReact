import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import Col from "react-bootstrap/Col";

import TotalExam from "./miniInfoBlock/totalExam";
import Rank from "./miniInfoBlock/rank";
import UpcomingExam from "./miniInfoBlock/upcomingExam";
import Result from "./miniInfoBlock/result";

import { miniInfoLoader } from "../../../store/miniInfo";

class MiniCards extends Component {
  componentDidMount() {
    this.props.onMiniInfoLoader();
  }

  render() {
    const { totalExam, rank, upcomingExam, result } = this.props.miniInfo;
    return (
      <>
        <Col xl={3} lg={6} className="p-2">
          <TotalExam value={totalExam[0]} footerValue={totalExam[1]} />
        </Col>
        <Col xl={3} lg={6} className="p-2">
          <Rank value={rank[0]} footerValue={rank[1]} />
        </Col>
        <Col xl={3} lg={6} className="p-2">
          <UpcomingExam
            value={upcomingExam[0]}
            footerValue={moment(upcomingExam[1]).format("DD-MM-YYYY")}
          />
        </Col>
        <Col xl={3} lg={6} className="p-2">
          <Result value={result[0]} footerValue={result[1]} />
        </Col>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onMiniInfoLoader: () => dispatch(miniInfoLoader()),
  };
};

const mapStateToProps = (state) => {
  return {
    miniInfo: state.miniInfo,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MiniCards);
