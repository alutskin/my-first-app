import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import CardDetails from "./pages/CardDetails";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import { fetchCards } from "./store/fetchCards";

const getCards = () => {
  return async (dispatch) => {
    try {
      const fetchedData = await fetchCards();
      dispatch({ type: 'fetch-data', cards: fetchedData });
    } catch (e) {
      console.log("App.js ERROR: can't fetch cards in getCards method.");
    }
  };
};


function App() {
  const dispatch = useDispatch();

  dispatch(getCards());

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
