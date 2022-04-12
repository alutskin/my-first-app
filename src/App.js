import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import CardDetails from "./pages/CardDetails";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import { getCards } from "./store/getCards";


function App() {
  const dispatch = useDispatch();

  getCards(dispatch);

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
