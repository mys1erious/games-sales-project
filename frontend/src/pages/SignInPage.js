import React, {useEffect, useState} from "react";
import {gapi} from "gapi-script";

import {
    Grid,
    Typography,
} from '@mui/material';
import './SignInPage.css';

import SignInForm from "../components/SignIn/SignInForm";
import SocialButtonsContainer from "../components/SignIn/SocialButtonsContainer";


const SignInPage = () => {
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
        <div className="login-container">
            <Grid
                container
                rowSpacing={4}
                direction="column"
                alignItems="center"
                justifyContent="center"

                // For testing purposes
                sx={{border: 1}}
            >
                <Grid item xs={12}>
                    <Typography variant="h4">Sign In</Typography>
                </Grid>
                <Grid item xs={12}>
                    <SignInForm formData={formData} updateFormData={updateFormData}/>
                </Grid>
                <Grid item xs={12}>
                    <SocialButtonsContainer />
                </Grid>
            {/*    <div id="googleSignInDiv" />*/}
            </Grid>
        </div>
        </React.Fragment>
    );
};


export default SignInPage;
