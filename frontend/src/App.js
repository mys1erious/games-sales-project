import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import './App.css';

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage";
import ReportsPage from "./pages/ReportsPage";
import SalesPage from "./components/Sales/SalesPage";
import SaleDetailPage from "./pages/SaleDetailPage";
import ProfilePage from "./pages/ProfilePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import SIgnOutPage from "./pages/SIgnOutPage";
import SalesSearchPage from "./components/Sales/SalesSearchPage";

import TestCreate from "./components/for_test_app/TestCreate";
import {SalesContext} from "./components/Sales/SalesContext";


function App() {

    const darkTheme = createTheme({
        palette: {
            mode: 'dark'
        }
    });
    const whiteTheme = createTheme({
        palette: {
            mode: 'light'
        }
    });

    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [sales, setSales] = useState(null);

    return (

        <Router>
            <React.StrictMode>
                <ThemeProvider theme={isDarkTheme ? darkTheme : whiteTheme}>
                <Header isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme}/>
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
                </ThemeProvider>
            </React.StrictMode>
        </Router>
    );
};

export default App;
