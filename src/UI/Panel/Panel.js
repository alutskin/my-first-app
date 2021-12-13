import React from "react";

import classes from "./Panel.module.css";

const Panel = ({ children }) => {
  return <div className={classes.panel}>{children}</div>;
};

export default Panel;
