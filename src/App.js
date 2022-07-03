import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { rootActions } from "./store/rootSlice";

import CardDetails from "./pages/CardDetails";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import { fetchCards } from "./store/fetchCards";
import Settings from "./pages/Settings";

const getCards = () => {
  return async (dispatch) => {
    try {
      const fetchedData = await fetchCards();
      dispatch(rootActions.fetchData(fetchedData));
    } catch (e) {
      console.log("App.js ERROR: can't fetch cards in getCards method.");
    }
  };
};


function App() {
  const dispatch = useDispatch();
  const isAdmin = useSelector(state => state.auth.isAdmin);

  dispatch(getCards());

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/card/:id" element={<CardDetails />} />
      {isAdmin && <Route path="/settings" element={<Settings />} />}
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
