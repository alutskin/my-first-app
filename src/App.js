import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import CardDetails from "./pages/CardDetails";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";

function App() {
  const dispatch = useDispatch();

  const getCards = useCallback(async () => {
    let cards = [];

    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/BrunnerLivio/PokemonDataGraber/master/output.json"
      );

      const data = response.data.slice(0, 15);

      cards = data.map((element) => {
        return {
          id: uuidv4(),
          caption: element.Name,
          text: element.About,
          checked: false,
        };
      });
    } catch (error) {}

    dispatch({ type: "fetch-data", cards });
  }, [dispatch]);

  getCards();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/card/:id" element={<CardDetails />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
