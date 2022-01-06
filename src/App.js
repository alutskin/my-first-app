import React, { useContext } from "react";

import styled from "styled-components";

import Header from "./components/Header/Header";
import CardList from "./components/CardList/CardList";
import DeleteButton from "./components/DeleteButton/DeleteButton";
import Panel from "./UI/Panel/Panel";
import AddCardButton from "./components/AddCardButton/AddCardButton";
import NewCardModal from "./components/NewCardModal/NewCardModal";
import DataContext from "./store/data-context";

const ReadOnlyCheckbox = React.memo(styled.input`
  margin-right: 10px;
  height: 16px;
  width: 16px;
  box-shadow: 1px 1px 4px rgb(22, 22, 22);
`);

function App() {
  const dataCtx = useContext(DataContext);

  return (
    <React.Fragment>
      {dataCtx.addingCard && <NewCardModal />}

      <Header />

      <Panel>
        <div style={{ marginRight: "auto" }}>
          <ReadOnlyCheckbox
            id="read-only"
            type="checkbox"
            onChange={dataCtx.onSetReadOnlyStatus}
          />
          <label htmlFor="read-only">Только просмотр</label>
        </div>

        <AddCardButton />

        <DeleteButton />
      </Panel>

      <CardList />
    </React.Fragment>
  );
}

export default App;
