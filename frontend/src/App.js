import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import axiosInstance from "./axios";

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

import PostLoadingComponent from "./components/core/PostLoading";
import SalesSearchPage from "./components/sales/SalesSearchPage";
import TestCreate from "./components/for_test_app/TestCreate";


function App() {
    const PostLoadingSalesPage = PostLoadingComponent(SalesPage);

    const [appState, setAppState] = useState({
        loading: true,
        sales: null,
    });

    useEffect(() => {
        getSales();
    }, [setAppState]);

    const getSales = () => {
        axiosInstance.get('/sales/')
            .then((response) => {
                setAppState({loading: false, sales: response.data});})
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.status);
                }
            });
    };

    return (
        <Router>
            <React.StrictMode>
                <Header />
                <div className="body-container">
                    <Routes>
                        <Route exact path="/" element={<HomePage />} />

                        <Route path="/sales/" element={
                            <PostLoadingSalesPage
                                isLoading={appState.loading}
                                sales={appState.sales}
                            />
                        } />
                        <Route path="/sales/:saleUUID/" element={<SaleDetailPage />} />
                        <Route path="/sales/search/" element={<SalesSearchPage />} />

                        <Route path="/reports/" element={<ReportsPage />} />

                        <Route path="/profile/" element={<ProfilePage />} />
                        <Route path="/signin/" element={<SignInPage />} />
                        <Route path="/signup/" element={<SignUpPage />} />
                        <Route path="/sign-out/" element={<SIgnOutPage />} />


                        {/*!!! Just for Testing !!!*/}
                        <Route path="/test_app/create/" element={<TestCreate />} />
                    </Routes>
                </div>
                <Footer />
            </React.StrictMode>
        </Router>
    );
};

export default App;
