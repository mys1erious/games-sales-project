import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../axios';

import {
    TextField,
    Grid,
    Button
} from "@material-ui/core";
import getSales from '../App';


const SignInPage = () => {

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
                email: formData.email,
                password: formData.password
            }).then((response) => {
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                axiosInstance.defaults.headers['Authorization'] =
                    'JWT ' + localStorage.getItem('access_token');

                window.location.reload();
                navigate('/profile/');
        });
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

            </form>
        </React.Fragment>
    )
}


export default SignInPage;
