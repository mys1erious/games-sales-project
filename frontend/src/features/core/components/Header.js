import React from "react";
import { NavLink } from 'react-router-dom';

import "./Header.css";

import {
    AppBar, Button,
    CssBaseline, FormControlLabel, Switch,
    Toolbar,
    Typography
} from "@mui/material";

import { ReactComponent as Logo } from "../../assets/logo.svg";


const Header = ({isDarkTheme, setIsDarkTheme}) => {

    const changeTheme = () => {
        setIsDarkTheme(currTheme => !currTheme)
    };

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
                        <FormControlLabel control={
                            <Switch checked={isDarkTheme} onChange={changeTheme}/>} label="Dark mode" />
                    </Typography>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}


export default Header;
