import React from "react";
import Dots from "./dots";
import { connect } from "react-redux";
import { sendMove } from "./dotsAction";
import { sendMoveRequest } from "../../socketHelper/socektDotsProvider";

const DotsContainer = props => {
  return <Dots matchState={props.matchState} onCellClick={props.sendMove} />;
};

const mapStateToProps = state => {
  return {
    matchState: state.dots
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendMove: moveEventData => {
      sendMoveRequest(moveEventData);
      dispatch(sendMove(moveEventData));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DotsContainer);
