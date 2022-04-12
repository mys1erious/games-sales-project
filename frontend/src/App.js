import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import './App.css';

import HomePage from "./pages/HomePage";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<HomePage />} />
            </Routes>
        </Router>
    );
}

export default App;
