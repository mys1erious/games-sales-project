import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";


const SIgnOutPage = () => {
    const navigate = useNavigate();

    const handleSignOut = async() => {
        axiosInstance.post(
            'auth/signout/blacklist/',
            {
                refresh_token: localStorage.getItem('refresh_token'),
            });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        axiosInstance.defaults.headers['Authorization'] = null;
        navigate('/signin/');
    };

    useEffect(() => {
        handleSignOut();
    });

    return(
        <React.Fragment>
            Sign Out
        </React.Fragment>
    )
}


export default SIgnOutPage;
