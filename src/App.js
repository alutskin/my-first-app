import { Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import { rootActions } from "./store/rootSlice";
import { fetchCards } from "./store/fetchCards";

const Home = lazy(() => import("./pages/Home"));
const SignIn = lazy(() => import("./pages/SignIn"));
const CardDetails = lazy(() => import("./pages/CardDetails"));
const Settings = lazy(() => import("./pages/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
            <Route path="/home" element={
                <Suspense fallback={<p>Loading...</p>}>
                    <Home />
                </Suspense>
            } />
            <Route path="/sign-in" element={
                <Suspense fallback={<p>Loading...</p>}>
                    <SignIn />
                </Suspense>
            } />
            <Route path="/card/:id" element={
                <Suspense fallback={<p>Loading...</p>}>
                    <CardDetails />
                </Suspense>
            } />
            {isAdmin && <Route path="/settings" element={
                <Suspense fallback={<p>Loading...</p>}>
                    <Settings />
                </Suspense>
            } />}
            <Route path="/*" element={
                <Suspense fallback={<p>Loading...</p>}>
                    <NotFound />
                </Suspense>
            } />
        </Routes>
    );
}

export default App;
