import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FacebookLogin from 'react-facebook-login';
import FacebookLoginAxios from "./FacebookLoginAxios";

import {
    TextField,
    Grid,
    Button
} from '@mui/material';
import axios from "axios";


const SignInPage = () => {

    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_BASE_API_URL,
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
        },
    });

    const navigate = useNavigate();
    const initialFormData = Object.freeze({
        email: '',
        password: ''
    });

    const [formData, updateFormData] = useState(initialFormData);


    const handleChange = (e) => {
        updateFormData({
            ...formData,
            // Trimming whitespaces
            [e.target.name]: e.target.value.trim(),
        });
    }

    const handleSubmit = (e) => {
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

    const responseFacebook = (response) => {
        FacebookLoginAxios(response.accessToken);
        navigate('/profile/');
        //window.location.reload();
    };

    return(
        <React.Fragment>
            <h1>Sign In</h1>
            <form noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant='outlined'
                            required
                            fullWidth
                            id='email'
                            label='Email Address'
                            name='email'
                            autoComplete='email'
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type='password'
                            variant='outlined'
                            required
                            fullWidth
                            id='password'
                            label='Password'
                            name='password'
                            autoComplete='password'
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    onClick={handleSubmit}>
                    Sign In
                </Button>
                <FacebookLogin
                    appId={process.env.REACT_APP_SOCIAL_AUTH_FACEBOOK_KEY}
                    fields="name,email,picture"
                    callback={responseFacebook}
                />
            </form>
        </React.Fragment>
    )
}


export default SignInPage;
