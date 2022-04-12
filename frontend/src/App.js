import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import './App.css';

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import SalesPage from "./pages/SalesPage";
import ReportsPage from "./pages/ReportsPage";
import ProfilePage from "./pages/ProfilePage";


function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" exact element={<HomePage />} />
                <Route path="/sales/" exact element={<SalesPage />} />
                <Route path="/reports/" exact element={<ReportsPage />} />
                <Route path="/profile/" exact element={<ProfilePage />} />
            </Routes>
        </Router>
    );
}

export default App;
