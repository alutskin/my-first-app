import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./Header.module.css";

function Header(props) {
  return (
    <header className={classes.header}>
      <h1 className={classes.h1}>{props.text}</h1>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sign-in"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              Sign in
            </NavLink>
          </li>
        </ul>
      </nav>
      {props.children}
    </header>
  );
}

export default React.memo(Header);
