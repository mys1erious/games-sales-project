import axios from 'axios';


const FacebookLoginAxios = (access_token) => {
    axios.post(process.env.REACT_APP_BASE_API_URL+'auth/convert-token/', {
        token: access_token,
        backend: 'facebook',
        grant_type: "convert_token",
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET
    }).then((response) => {
        console.log(response);
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);
        });
};


export default FacebookLoginAxios;
