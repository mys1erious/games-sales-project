import React from 'react';
import {Grid} from "@mui/material";

import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";

import SignInButton from "./SignInButton";
import axiosSocialAuth from "./axiosSocialAuth";
import {useNavigate} from "react-router-dom";


const SocialButtonsContainer = () => {
    const navigate = useNavigate();

    const handleSocialAuth = async(response, backendType) => {
        await axiosSocialAuth(response.accessToken, backendType);
        navigate('/profile/');
        window.location.reload();
    };

    const handleFacebookAuth = async(response) => {await handleSocialAuth(response, 'facebook')};
    const handleGoogleAuth = async(response) => {await handleSocialAuth(response, 'google-oauth2')};

    return(
        <Grid item container spacing={0.5}>
            <Grid item xs={12}>
                <FacebookLogin
                    appId={process.env.REACT_APP_SOCIAL_AUTH_FACEBOOK_KEY}
                    callback={handleFacebookAuth}
                    fields="name,email,picture"
                    render={renderProps => (
                        <SignInButton
                            buttonText="Sign In with Facebook"
                            onClickFunc={renderProps.onClick}
                        />)}
                />
            </Grid>
            <Grid item xs={12}>
                <GoogleLogin
                    clientId={process.env.REACT_APP_SOCIAL_AUTH_GOOGLE_KEY}
                    onSuccess={handleGoogleAuth}
                    onFailure={handleGoogleAuth}
                    cookiePolicy='single_host_origin'
                    render={renderProps => (
                        <SignInButton
                            buttonText="Sign In with Google"
                            onClickFunc={renderProps.onClick}
                        />)}
                />
            </Grid>
        </Grid>
    );
};


export default SocialButtonsContainer;
