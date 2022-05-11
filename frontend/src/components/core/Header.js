import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';

import "./Header.css";

import {
    AppBar, Button,
    CssBaseline,
    Icon,
    Link,
    Toolbar,
    Typography
} from "@mui/material";


import SearchBar from "./SearchBar";
import { ReactComponent as Logo } from "../../assets/logo.svg";


const Header = () => {
    let navigate = useNavigate();

    const [data, setData] = useState({ search: '' });
    const [searchQuery, setSearchQuery] = useState("");

    const goSearch = (e) => {
        navigate({
            pathname: '/sales/search/',
            search: '?name=' + data.search,
        });
        window.location.reload();
    }
    return(
        <React.Fragment>
            <CssBaseline />
            <AppBar
                position="sticky"
                color="default"
                elevation={0}
            >
                <Toolbar >
                    <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                    >
                        <Button
                            component={NavLink}
                            to="/"
                            color="inherit"
                            variant="text"
                            startIcon={<Logo className="logo" />}>
                            Home
                        </Button>
                        <Button
                            component={NavLink}
                            to="/sales/"
                            color="inherit"
                            variant="text">
                            Sales
                        </Button>
                        <Button
                            component={NavLink}
                            to="/reports/"
                            color="inherit"
                            variant="text">
                            Reports
                        </Button>
                    </Typography>
                    <SearchBar
                        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                        onChange={(newVal) => setData({search: newVal})}
                        onRequestSearch={() => goSearch(data.search)}
                    />
                    <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                    >
                        {
                            localStorage.getItem('access_token') !== null
                                ?
                                <React.Fragment>
                                    <Button
                                        component={NavLink}
                                        to="profile"
                                        color="inherit"
                                        variant="text">
                                        Profile
                                    </Button>
                                    <Button
                                        component={NavLink}
                                        to="/sign-out/"
                                        color="inherit"
                                        variant="text">
                                        Sign Out
                                    </Button>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <Button
                                        component={NavLink}
                                        to="/signin/"
                                        color="inherit"
                                        variant="text">
                                        Sign In
                                    </Button>
                                    <Button
                                        component={NavLink}
                                        to="/signup/"
                                        color="inherit"
                                        variant="text">
                                        Sign Up
                                    </Button>
                                </React.Fragment>
                        }
                    </Typography>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}


export default Header;
