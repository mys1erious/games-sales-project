import React, {useState} from 'react';
import {Avatar, Button, Container, Grid, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../../axios";


const TestCreate = () => {
    const navigate = useNavigate();

    const initialFormData = Object.freeze({
        name: '',
        bio: '',
    });

    const [testData, updateTestData] = useState(initialFormData);
    const [testImage, setTestImage] = useState(null);

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setTestImage({
                image: e.target.files,
            });
            console.log(e.target.files);
        } else {
            updateTestData({
            ...testData,
            [e.target.name]: e.target.value.trim(),
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('name', testData.name);
        formData.append('bio', testData.bio);
        formData.append('avatar', testImage.image[0]);

        axiosInstance.post('test_image/create/', formData);
        navigate('/');
    };

    return(
        <Container component="main" maxWidth="xs">
            <Avatar></Avatar>
            <Typography component="h1" variant="h5">
                Create new TestAppInstance
            </Typography>
            <form noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="name"
                            label="Test Name"
                            name="name"
                            autoComplete="name"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="bio"
                            label="bio"
                            name="bio"
                            autoComplete="bio"
                            onChange={handleChange}
                            multiline
                            rows={4}
                        />
                    </Grid>
                    <input
                        accept="image/*"
                        id="test_app-image"
                        onChange={handleChange}
                        name="image"
                        type="file"
                    />
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Create TestAppInstance
                </Button>
            </form>
        </Container>
    );
};


export default TestCreate;
