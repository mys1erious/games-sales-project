import React from 'react';
import {Grid, TextField} from "@mui/material";
import SignInButton from "./SignInButton";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const SignInForm = ({formData, updateFormData}) => {
    const navigate = useNavigate();

    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_BASE_API_URL,
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
        },
    });

    const handleEmailAuth = (e) => {
        e.preventDefault();

        axiosInstance.post(
            'auth/token/',
            {
                username: formData.email,
                password: formData.password,
                grant_type: "password",
                client_id: process.env.REACT_APP_CLIENT_ID,
                client_secret: process.env.REACT_APP_CLIENT_SECRET,
            }).then((response) => {
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('refresh_token', response.data.refresh_token);

                navigate('/profile/');
                window.location.reload();
        });
    };

        const handleChange = (e) => {
        updateFormData({
            ...formData,
            // Trimming whitespaces
            [e.target.name]: e.target.value.trim(),
        });
    };

    return (
        <form noValidate>
            <Grid item xs={12} container spacing={1}>
                <Grid item xs={12}>
                    <TextField
                        variant='outlined'
                        required
                        id='email'
                        label='Email Address'
                        name='email'
                        autoComplete='email'
                        fullWidth
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type='password'
                        variant='outlined'
                        required
                        id='password'
                        label='Password'
                        name='password'
                        autoComplete='password'
                        fullWidth
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <SignInButton
                        buttonText="Sign In With Email"
                        onClickFunc={handleEmailAuth}
                    />
            </Grid>
            </Grid>
        </form>
    );
};


export default SignInForm;
