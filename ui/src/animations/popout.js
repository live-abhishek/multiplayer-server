import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./popout.css";

const Popout = ({ children, ...props }) => (
  <TransitionGroup appear>
    <CSSTransition {...props} timeout={500} classNames={"popout"}>
      {children}
    </CSSTransition>
  </TransitionGroup>
);

export default Popout;
