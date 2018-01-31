import React from "react";
import { CSSTransition } from "react-transition-group";
import "./fadeout.css";

const Fadeout = ({ children, ...props }) => (
  <CSSTransition {...props} timeout={2000} classNames={"fadeout"} appear={true}>
    {children}
  </CSSTransition>
);

export default Fadeout;
