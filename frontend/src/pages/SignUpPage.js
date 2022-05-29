import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
    TextField,
    Grid,
    Button, Typography
} from '@mui/material';
import SignInForm from "../components/Auth/SignIn/SignInForm";
import SocialButtonsContainer from "../components/Auth/Core/SocialButtonsContainer";
import AuthGrid from "../components/Auth/Core/AuthGrid";
import SignUpForm from "../components/Auth/SignUp/SignUpForm";


const SignUpPage = () => {
    const navigate = useNavigate();

    const initialFormData = Object.freeze({
        email: '',
        username: '',
        password: ''
    });

    const [formData, updateFormData] = useState(initialFormData);

    return(
        <React.Fragment>
        <div className="container-outer">
            <div className="container-middle">
                <div className="container-inner">
                    <AuthGrid content={
                        <>
                        <Grid item xs={12}>
                            <Typography variant="h4">Sign Up</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <SignUpForm formData={formData} updateFormData={updateFormData}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                variant="caption"
                            >
                                Have an account?
                                <a href="/signin/"> Sign In.</a>
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


export default SignUpPage;
