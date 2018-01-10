import React from "react";
import { CSSTransition } from "react-transition-group";
import "./popout.css";

const Popout = ({ children, ...props }) => (
  <CSSTransition {...props} timeout={500} classNames={"popout"}>
    {children}
  </CSSTransition>
);

export default Popout;
