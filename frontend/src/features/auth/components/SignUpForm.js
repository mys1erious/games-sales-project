import React from 'react';
import {Button, Grid, TextField} from "@mui/material";
import AuthButton from "../Core/AuthButton";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const SignInForm = ({formData, updateFormData}) => {
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        updateFormData({
            ...formData,
            // Trimming whitespaces
            [e.target.name]: e.target.value.trim(),
        });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        let response = await axios.post(
            process.env.REACT_APP_BASE_API_URL+'auth/signup/',
            {
                email: formData.email,
                username: formData.username,
                password: formData.password
            });

        navigate('/signin/');
    }

    return (
        <form noValidate>
            <Grid item xs={12} container spacing={1}>
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
                        variant='outlined'
                        required
                        fullWidth
                        id='username'
                        label='Username'
                        name='username'
                        autoComplete='username'
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
                <Grid item xs={12}>
                    <AuthButton
                        buttonText="Sign Up with Email"
                        onClickFunc={handleSubmit}
                    />
                </Grid>
            </Grid>
        </form>
    );
};


export default SignInForm;
