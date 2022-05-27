import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
    TextField,
    Grid,
    Button
} from '@mui/material';


const SignUpPage = () => {
    const navigate = useNavigate();
    const initialFormData = Object.freeze({
        email: '',
        username: '',
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

    const handleSubmit = async(e) => {
        e.preventDefault();

        let response = await axios.post(
            process.env.REACT_APP_BASE_API_URL+'auth/signup/',
            {
                email: formData.email,
                username: formData.username,
                password: formData.password
            });

        // Add check for errors
        navigate('/signin/');
        console.log(response.data);
    }

    return(
        <React.Fragment>
            <h1>Sign Up</h1>
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
                </Grid>
                <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    onClick={handleSubmit}>
                    Sign Up
                </Button>

            </form>
        </React.Fragment>
    )
}


export default SignUpPage;
