import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";


const SIgnOutPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const response = axiosInstance.post(
            'auth/sign-out/blacklist/',
            {
                refresh_token: localStorage.getItem('refresh_token'),
            });
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            axiosInstance.defaults.headers['Authorization'] = null;
            navigate('/signin')
    })

    return(
        <React.Fragment>
            Sign Out
        </React.Fragment>
    )
}


export default SIgnOutPage;
