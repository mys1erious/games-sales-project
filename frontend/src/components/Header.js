import React from "react";
import '../css/Header.css';
import {ReactComponent as Logo} from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";


const Header = () => {

    let navigate = useNavigate();

    return(
        <div className="header">
            <span className="header-panel">
                <Logo className="logo" onClick={() => navigate('/')}/>
                <span className="h_btn" onClick={() => navigate('/')}>Home</span>
                <span className="h_btn" onClick={() => navigate('/sales/')}>Sales</span>
                <span className="h_btn" onClick={() => navigate('/reports/')}>Reports</span>
                <span className="h_btn" onClick={() => navigate('/profile/')}>Profile</span>
            </span>
            <span className="header-panel">
                <span className="h_btn" onClick={() => navigate('/signin/')}>Sign In</span>
            </span>
        </div>
    )
}


export default Header;
