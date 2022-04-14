import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import './App.css';

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import SalesPage from "./pages/SalesPage";
import ReportsPage from "./pages/ReportsPage";
import ProfilePage from "./pages/ProfilePage";
import SignInPage from "./pages/SignInPage";



function App() {
    return (
        <Router>
            <Header />
            <div className="body-container">
                <Routes>
                    <Route path="/" exact element={<HomePage />} />
                    <Route path="/sales/" exact element={<SalesPage />} />
                    <Route path="/reports/" exact element={<ReportsPage />} />
                    <Route path="/profile/" exact element={<ProfilePage />} />
                    <Route path="/signin/" exact element={<SignInPage />} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;
