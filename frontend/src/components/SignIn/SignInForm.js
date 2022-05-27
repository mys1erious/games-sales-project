import React from 'react';
import {Grid, TextField} from "@mui/material";


const SignInForm = ({formData, updateFormData}) => {

        const handleChange = (e) => {
        updateFormData({
            ...formData,
            // Trimming whitespaces
            [e.target.name]: e.target.value.trim(),
        });
    };

    return (
        <form noValidate>
            <Grid item container spacing={1}>
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
        </form>
    );
};


export default SignInForm;
