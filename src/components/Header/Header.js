import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { authActions } from "../../store/authSlice";

import classes from "./Header.module.css";
import UserGreeting from "../UserGreeting/UserGreeting";

function Header(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(store => store.auth.token);
  const isSignedIn = useSelector(store => store.auth.token);
  const isAdmin = useSelector(store => store.auth.isAdmin);

  const signOut = () => {
    dispatch(authActions.signOut());

    navigate("/home");
  };

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
          {isAdmin &&
            <li>
              <NavLink to="/settings" className={({ isActive }) => (isActive ? classes.active : "")}>
                Settings
              </NavLink>
            </li>}
          <li>
            {!token && <NavLink
              to="/sign-in"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              Sign in
            </NavLink>}

            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            {token && <a href="" onClick={signOut}>Выйти</a>}
          </li>
        </ul>
      </nav>
      {isSignedIn && <UserGreeting />}
      {props.children}
    </header>
  );
}

export default React.memo(Header);
