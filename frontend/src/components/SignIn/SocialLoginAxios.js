import axios from 'axios';


const SocialLoginAxios = async(accessToken, backendType) => {
    let response = await axios.post(process.env.REACT_APP_BASE_API_URL+'auth/convert-token/', {
        token: accessToken,
        backend: `${backendType}`,
        grant_type: "convert_token",
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
    });
    console.log(response);
    localStorage.setItem('access_token', response.data.access_token);
    localStorage.setItem('refresh_token', response.data.refresh_token);
};


export default SocialLoginAxios;
