import { useSelector } from "react-redux";
import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { rootActions } from "../store/rootSlice";
import Header from "../components/Header/Header";

const ReadOnlyCheckbox = React.memo(styled.input`
  margin-right: 10px;
  height: 16px;
  width: 16px;
  box-shadow: 1px 1px 4px rgb(22, 22, 22);
`);

const Settings = () => {
    const readOnly = useSelector(store => store.root.readOnly);
    const dispatch = useDispatch();

    const changeReadOnlyStatusHandler = (event) => {
        dispatch(rootActions.changeReadOnlyStatus(event));
    };

    return (
        <>
            <Header text="Settings" />
            <div style={{ marginRight: "auto" }}>
                <ReadOnlyCheckbox
                    id="read-only"
                    type="checkbox"
                    checked={readOnly}
                    onChange={changeReadOnlyStatusHandler}
                />
                <label htmlFor="read-only">Только просмотр</label>
            </div>
        </>
    );
};

export default Settings;
