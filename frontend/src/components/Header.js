import React, {useState} from "react";
import '../css/Header.css';
import {ReactComponent as Logo} from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import SalesSearchBar from "./SalesSearchBar";


const Header = () => {

    let navigate = useNavigate();
    const [data, setData] = useState({ search: '' });

    let renderSearchBar = () => {
        if (window.location.href.includes('sales')) {
           return <SalesSearchBar />
        }
    }

    const goSearch = (e) => {
        navigate.push({
            pathname: '/search/',
            search: '?search=' + data.search,
        });
        window.location.reload();
    }

    return(
        <div className="header">
            <span className="header-panel">
                <Logo className="logo" onClick={() => navigate('/')}/>
                <span className="h_btn" onClick={() => navigate('/')}>Home</span>
                <span className="h_btn" onClick={() => navigate('/sales/')}>Sales</span>
                <span className="h_btn" onClick={() => navigate('/reports/')}>Reports</span>
                <span className="h_btn" onClick={() => navigate('/profile/')}>Profile</span>
                <span className="h_btn">{ renderSearchBar() }</span>
            </span>
            <span className="header-panel">
                {
                    localStorage.getItem('access_token') !== null
                        ?
                        <span className="h_btn" onClick={() => navigate('/sign-out/')}>Sign Out</span>
                        :
                        <React.Fragment>
                            <span className="h_btn" onClick={() => navigate('/signin/')}>Sign In</span>
                            <span className="h_btn" onClick={() => navigate('/signup/')}>Sign Up</span>
                        </React.Fragment>
                }

            </span>
        </div>
    )
}


export default Header;
