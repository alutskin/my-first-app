import React from "react";
import Counter from "../Counter/Counter";

import classes from './Header.module.css';

function Header() {
    return (
        <header className={classes.header}>
            <h1 className={classes.h1}>Hello! This is my first header on React project.</h1>
            <Counter />
        </header>
    );
}

export default React.memo(Header);
