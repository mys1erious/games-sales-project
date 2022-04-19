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
import SaleDetailPage from "./pages/SaleDetailPage";



function App() {

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    const csrftoken = getCookie('csrftoken');

    return (
        <Router>
            <Header />
            <div className="body-container">
                <Routes>
                    <Route path="/" exact element={<HomePage />} />
                    <Route path="/sales/" exact element={<SalesPage />} />
                    <Route path="/sales/:saleUUID/" element={<SaleDetailPage />} />
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
