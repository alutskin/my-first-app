import React, { useState, useCallback } from "react";

import styled from "styled-components";

import Header from "./components/Header/Header";
import CardList from "./components/CardList/CardList";
import DeleteButton from "./components/DeleteButton/DeleteButton";
import Panel from "./UI/Panel/Panel";

const INITIAL_DATA = [
  {
    id: "c1",
    caption: "Таблица цветов",
    text:
      "Для сохранения единообразия страниц, цвета в МедиаВики нужно" +
      "использовать обдуманно. Яркие цвета в статьях должны использоваться" +
      "только в виде исключения, когда это целесообразно по содержанию (на" +
      "своей странице участника можете брызгать краской по своему вкусу :-). В" +
      "порталах допускается более интенсивная раскраска, но ориентируйтесь на" +
      "существующие примеры.",
    checked: false,
  },
  {
    id: "c2",
    caption: "Значение физической культуры и спорта",
    text:
      "Одной из самых востребованных тем для рефератов по физкультуре" +
      "является «Значение физической культуры и спорта в жизни человека». Это" +
      "связано в первую очередь с тем, что в этой работе должна быть описано: " +
      "основные принципы физической культуры, а так же его польза и применение в обычной жизни.",
    checked: false,
  },
  {
    id: "c3",
    caption: "История развития физической культуры",
    text:
      "Реферат «История развития физической культуры» является так же одной " +
      "из самых распространенных и востребованных работ на уроках физкультуры. Это " +
      "связано в первую очередь с тем, что данный материал должен повествовать о " +
      "возникновении данного предмета, а так же о принципах его формирования.",
    checked: false,
  },
  {
    id: "c4",
    caption: "Таблица цветов",
    text:
      "Для сохранения единообразия страниц, цвета в МедиаВики нужно" +
      "использовать обдуманно. Яркие цвета в статьях должны использоваться" +
      "только в виде исключения, когда это целесообразно по содержанию (на" +
      "своей странице участника можете брызгать краской по своему вкусу :-). В" +
      "порталах допускается более интенсивная раскраска, но ориентируйтесь на" +
      "существующие примеры.",
    checked: false,
  },
  {
    id: "c5",
    caption: "Значение физической культуры и спорта",
    text:
      "Одной из самых востребованных тем для рефератов по физкультуре" +
      "является «Значение физической культуры и спорта в жизни человека». Это" +
      "связано в первую очередь с тем, что в этой работе должна быть описано: " +
      "основные принципы физической культуры, а так же его польза и применение в обычной жизни.",
    checked: false,
  },
  {
    id: "c6",
    caption: "История развития физической культуры",
    text:
      "Реферат «История развития физической культуры» является так же одной " +
      "из самых распространенных и востребованных работ на уроках физкультуры. Это " +
      "связано в первую очередь с тем, что данный материал должен повествовать о " +
      "возникновении данного предмета, а так же о принципах его формирования.",
    checked: false,
  },
  {
    id: "c7",
    caption: "What Is React?",
    text:
      "React is a declarative, efficient, and flexible JavaScript library for " +
      "building user interfaces. It lets you compose complex UIs from small and isolated " +
      "pieces of code called “components”.We’ll get to the funny XML-like tags soon. " +
      "We use components to tell React what we want to see on the screen. When our data " +
      "changes, React will efficiently update and re-render our components." +
      "Here, ShoppingList is a React component class, or React component type. A component " +
      "takes in parameters, called props (short for “properties”), and returns a hierarchy " +
      "of views to display via the render method.",
    checked: false,
  },
  {
    id: "c8",
    caption: "Inspecting the Starter Code",
    text:
      "If you’re going to work on the tutorial in your browser, open this code in " +
      "a new tab: Starter Code. If you’re going to work on the tutorial locally, instead " +
      "open src/index.js in your project folder (you have already touched this file " +
      "during the setup). This Starter Code is the base of what we’re building. We’ve " +
      "provided the CSS styling so that you only need to focus on learning React and " +
      "programming the tic-tac-toe game.",
    checked: false,
  },
];

const ReadOnlyCheckbox = React.memo(styled.input`
  margin-right: 10px;
  height: 16px;
  width: 16px;
  box-shadow: 1px 1px 4px rgb(22, 22, 22);
`);

function App() {
  const [appState, setAppState] = useState(INITIAL_DATA);
  const [readOnly, setReadOnly] = useState(false);

  const updateContentHandler = (newCaption, newText, id) => {
    const newAppState = appState.slice(0);
    const card = newAppState.find((data) => data.id === id);
    card.caption = newCaption;
    card.text = newText;
    setAppState(newAppState);
  };

  const updateCheckedStatusHandler = (status, id) => {
    const newAppState = appState.slice(0);
    const card = newAppState.find((data) => data.id === id);
    card.checked = status;
    setAppState(newAppState);
  };

  const readOnlyStatusHandler = useCallback((event) => {
    if (event.target.checked) {
      setReadOnly(true);
    } else {
      setReadOnly(false);
    }
  }, []);

  const deleteSelectedCardsHandler = () => {
    const newAppState = appState.filter((data) => data.checked === false);
    setAppState(newAppState);
  };

  return (
    <div>
      <Header />

      <Panel>
        <div>
          <ReadOnlyCheckbox
            id="read-only"
            type="checkbox"
            onChange={readOnlyStatusHandler}
          />
          <label htmlFor="read-only">Только просмотр</label>
        </div>

        <DeleteButton onClick={deleteSelectedCardsHandler} />
      </Panel>

      <CardList
        data={appState}
        readOnly={readOnly}
        onUpdateContent={updateContentHandler}
        onUpdateCheckedStatus={updateCheckedStatusHandler}
      />
    </div>
  );
}

export default App;
