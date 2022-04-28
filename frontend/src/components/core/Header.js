import React, {useState} from "react";
import './Header.css';
import {ReactComponent as Logo} from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import SearchBar from "material-ui-search-bar";


const Header = () => {

    let navigate = useNavigate();
    const [data, setData] = useState({ search: '' });

    const goSearch = (e) => {
        navigate({
            pathname: '/sales/search/',
            search: '?name=' + data.search,
        });
        window.location.reload();
    }

    return(
        <div className="header">
            <span className="header-panel">
                <Logo className="logo" onClick={() => navigate('/')}/>
                <span className="h_btn" onClick={() => navigate('/')}>Home</span>
                <span className="h_btn" onClick={() => navigate('/sales/')}>Sales</span>
                <span className="h_btn" onClick={() => navigate('/reports/')}>Reports</span>
                <span className="h_btn" onClick={() => navigate('/profile/')}>Profile</span>
                <SearchBar
                    value={data.search}
                    onChange={(newVal) => setData({search: newVal})}
                    onRequestSearch={() => goSearch(data.search)}
                />
            </span>
            <span className="header-panel">
                {
                    localStorage.getItem('access_token') !== null
                        ?
                        <span className="h_btn" onClick={() => navigate('/sign-out/')}>Sign Out</span>
                        :
                        <React.Fragment>
                            <span className="h_btn" onClick={() => navigate('/signin/')}>Sign In</span>
                            <span className="h_btn" onClick={() => navigate('/signup/')}>Sign Up</span>
                        </React.Fragment>
                }

            </span>
        </div>
    )
}


export default Header;
