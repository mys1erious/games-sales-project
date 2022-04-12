import React from "react";
import '../css/Header.css';
import {ReactComponent as Logo} from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";


const Header = () => {

    let navigate = useNavigate();

    let logoOnClick = () => {
        navigate('/')
        console.log("Clicked on Logo")
    }

    return(
        <div className="header">
            <Logo className="logo" onClick={logoOnClick}/>
            <span onClick={() => navigate('/')}>Home</span>
            <span onClick={() => navigate('/sales/')}>Sales</span>
            <span onClick={() => navigate('/reports/')}>Reports</span>
            <span onClick={() => navigate('/profile/')}>Profile</span>
        </div>
    )
}


export default Header;
