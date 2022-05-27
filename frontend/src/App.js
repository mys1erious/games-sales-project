import React, {useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import './App.css';

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./Pages/HomePage";
import ReportsPage from "./Pages/ReportsPage";
import SalesPage from "./components/Sales/SalesPage";
import SaleDetailPage from "./Pages/SaleDetailPage";
import ProfilePage from "./Pages/ProfilePage";
import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/SignUpPage";
import SIgnOutPage from "./Pages/SIgnOutPage";
import SalesSearchPage from "./components/Sales/SalesSearchPage";

import TestCreate from "./components/for_test_app/TestCreate";
import {SalesContext} from "./components/Sales/SalesContext";


function App() {
    const [sales, setSales] = useState(null);

    return (
        <Router>
            <React.StrictMode>
                <Header />
                <div className="body-container">
                    <SalesContext.Provider value={{sales, setSales}}>
                    <Routes>
                        <Route exact path="/" element={<HomePage />} />

                        <Route path="/sales/" element={<SalesPage />} />
                        <Route path="/sales/:saleUUID/" element={<SaleDetailPage />} />
                        <Route path='/sales/search/' element={<SalesSearchPage />} />
                        <Route path="/reports/" element={<ReportsPage />} />

                        <Route path="/profile/" element={<ProfilePage />} />
                        <Route path="/signin/" element={<SignInPage />} />
                        <Route path="/signup/" element={<SignUpPage />} />
                        <Route path="/sign-out/" element={<SIgnOutPage />} />

                        {/* Just for Testing */}
                        <Route path="/test_app/create/" element={<TestCreate />} />
                    </Routes>
                    </SalesContext.Provider>
                </div>
                <Footer />
            </React.StrictMode>
        </Router>
    );
};

export default App;
