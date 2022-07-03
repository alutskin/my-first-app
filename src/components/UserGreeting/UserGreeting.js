import { useSelector } from "react-redux";

import classes from "./UserGreeting.module.css";

const UserGreeting = () => {
    const userName = useSelector(store => store.auth.userName);

    return <span className={classes.greeting}>Приветствую, {userName}</span>;
};

export default UserGreeting;