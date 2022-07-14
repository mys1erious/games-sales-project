import React, {useEffect, useState} from "react";
import {gapi} from "gapi-script";

import {
    Grid,
    Typography,
} from '@mui/material';
import '../components/Auth/Core/AuthBase.css';

import SignInForm from "../components/Auth/SignIn/SignInForm";
import SocialButtonsContainer from "../components/Auth/Core/SocialButtonsContainer";
import AuthGrid from "../components/Auth/Core/AuthGrid";


const SignIn = () => {
    const initialFormData = Object.freeze({
        email: '',
        password: ''
    });

    const [formData, updateFormData] = useState(initialFormData);

    useEffect(() => {
       const start = () => {
           gapi.client.init({
               client_id: process.env.REACT_APP_SOCIAL_AUTH_GOOGLE_KEY,
               scope: ""
           });
       };
        gapi.load("client:auth2", start);
    }, []);

// For new Google Identity Service (havent figured out how to get accessToken yet)
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

    return(
        <React.Fragment>
        <div className="container-outer">
            <div className="container-middle">
                <div className="container-inner">
                    <AuthGrid content={
                        <>
                        <Grid item xs={12}>
                            <Typography variant="h4">Sign In</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <SignInForm formData={formData} updateFormData={updateFormData}/>
                        </Grid>
                        <Grid item xs={12}>
                            <SocialButtonsContainer />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                variant="caption"
                            >
                                Dont have an account?
                                <a href="/signup/"> Sign Up.</a>
                            </Typography>
                        </Grid>
                        </>
                    }/>
                    {/*    <div id="googleSignInDiv" />*/}
                </div>
            </div>
        </div>
        </React.Fragment>
    );
};


export default SignIn;
