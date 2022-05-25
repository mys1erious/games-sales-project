import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import GoogleLogin from 'react-google-login';
import {gapi} from "gapi-script";

import {
    TextField,
    Grid,
    Button, Container
} from '@mui/material';

import axios from "axios";
import socialLoginAxios from "./SocialLoginAxios";


const SignInPage = () => {

    useEffect(() => {
       const start = () => {
           gapi.client.init({
               client_id: process.env.REACT_APP_SOCIAL_AUTH_GOOGLE_KEY,
               scope: ""
           });
       };
        gapi.load("client:auth2", start);
    });

/*    useEffect(() => {
        /!* global google *!/
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_SOCIAL_AUTH_GOOGLE_KEY,
            callback: responseGoogle
        });
        google.accounts.id.renderButton(
            document.getElementById("googleSignInDiv"),
            { theme: "outline", size: "large"}
        );
    }, []);*/

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

    const onSocialAuth = async(response, backendType) => {
        await socialLoginAxios(response.accessToken, backendType);
        navigate('/profile/');
        window.location.reload();
    }

    const onFacebookAuth = async(response) => {await onSocialAuth(response, 'facebook')};
    const onGoogleAuth = async(response) => {await onSocialAuth(response, 'google-oauth2')};

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
                <Container component="main">
                    <Button
                        type='submit'
                        variant='outlined'
                        color='primary'
                        size='large'
                        onClick={handleSubmit}>
                        Sign In with Email
                    </Button>
                    <br />
                    <FacebookLogin
                        appId={process.env.REACT_APP_SOCIAL_AUTH_FACEBOOK_KEY}
                        callback={onFacebookAuth}
                        fields="name,email,picture"
                        render={renderProps => (
                            <Button
                                type='submit'
                                variant='outlined'
                                color='primary'
                                size='large'
                                onClick={handleSubmit}>
                                Sign In with Facebook
                            </Button>
                        )}
                    />
                    <br />
                    <GoogleLogin
                        clientId={process.env.REACT_APP_SOCIAL_AUTH_GOOGLE_KEY}
                        onSuccess={onGoogleAuth}
                        onFailure={onGoogleAuth}
                        cookiePolicy='single_host_origin'
                        render={renderProps => (
                            <Button
                                type='submit'
                                variant='outlined'
                                color='primary'
                                size='large'
                                onClick={handleSubmit}>
                                Sign In with Google
                            </Button>
                        )}
                    />
                </Container>
                {/*<div id="googleSignInDiv" />*/}

            </form>
        </React.Fragment>
    )
}


export default SignInPage;
