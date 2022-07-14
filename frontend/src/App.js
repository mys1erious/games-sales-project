import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import './App.css';

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import SalesPage from "./components/Sales/SalesPage";
import SaleDetail from "./pages/SaleDetail";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SignOut from "./pages/SignOut";
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
                        <Route exact path="/" element={<Home />} />

                        <Route path="/sales/" element={<SalesPage />} />
                        <Route path="/sales/:saleUUID/" element={<SaleDetail />} />
                        <Route path='/sales/search/' element={<SalesSearchPage />} />
                        <Route path="/reports/" element={<Reports />} />

                        <Route path="/profile/" element={<Profile />} />
                        <Route path="/signin/" element={<SignIn />} />
                        <Route path="/signup/" element={<SignUp />} />
                        <Route path="/sign-out/" element={<SignOut />} />

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
