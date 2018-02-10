import React from "react";
import Dots from "./dots";
import { connect } from "react-redux";

const DotsContainer = props => {
  return <Dots />;
};

const mapStateToProps = state => {
  return {
    matchState: state.dots
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendMove: moveEventData => {}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DotsContainer);
