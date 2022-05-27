 import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../components/Core/AxiosBase";


const SIgnOutPage = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        axiosInstance.post(
            'auth/revoke-token/',
            {
                token: localStorage.getItem('refresh_token'),
                client_id: process.env.REACT_APP_CLIENT_ID,
                client_secret: process.env.REACT_APP_CLIENT_SECRET,
            }).then( (response) => {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                axiosInstance.defaults.headers['Authorization'] = null;

                navigate('/signin/');
                window.location.reload();
            });
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
