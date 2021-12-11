import React from "react";

import classes from './Header.module.css';

function Header() {
    return (
        <header className={classes.header}>
            <h1 className={classes.h1}>Hello! This is my first header on React project.</h1>
        </header>
    );
}

export default React.memo(Header);
