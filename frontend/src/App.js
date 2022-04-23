import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import axiosInstance from "./axios";

import './App.css';

import Header from "./components/Header";
import Footer from "./components/Footer";
import PostLoadingComponent from './components/PostLoading';

import HomePage from "./pages/HomePage";
import SalesPage from "./pages/SalesPage";
import SaleDetailPage from "./pages/SaleDetailPage";
import ReportsPage from "./pages/ReportsPage";
import ProfilePage from "./pages/ProfilePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import SIgnOutPage from "./pages/SIgnOutPage";


function App() {

    const PostLoadingSalesPage = PostLoadingComponent(SalesPage);
    const [appState, setAppState] = useState({
        loading: true,
        sales: null,
    });

    useEffect(() => {
        axiosInstance.get('/sales/').then((response) => {
            setAppState({loading: false, sales: response.data});
        });
    }, [setAppState]);

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
                        <Route path="/reports/" element={<ReportsPage />} />
                        <Route path="/profile/" element={<ProfilePage />} />
                        <Route path="/signin/" element={<SignInPage />} />
                        <Route path="/signup/" element={<SignUpPage />} />
                        <Route path="/sign-out/" element={<SIgnOutPage />} />
                    </Routes>
                </div>
                <Footer />
            </React.StrictMode>
        </Router>
    );
};

export default App;
