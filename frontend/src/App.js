import React, {useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import './App.css';

import Header from "./components/core/Header";
import Footer from "./components/core/Footer";
import HomePage from "./components/core/HomePage";
import ReportsPage from "./components/ReportsPage";
import SalesPage from "./components/sales/SalesPage";
import SaleDetailPage from "./components/sales/SaleDetailPage";
import ProfilePage from "./components/user_handle/ProfilePage";
import SignInPage from "./components/user_handle/SignInPage";
import SignUpPage from "./components/user_handle/SignUpPage";
import SIgnOutPage from "./components/user_handle/SIgnOutPage";
import SalesSearchPage from "./components/sales/SalesSearchPage";

import TestCreate from "./components/for_test_app/TestCreate";
import {SalesContext} from "./components/sales/SalesContext";


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
