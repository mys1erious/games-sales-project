import React, {useEffect, useState} from "react";
import axiosInstance from "../axios";
import app from "../App";


const SalesSearchBar = () => {
    const [appState, setAppState] = useState({
        search: '',
        sales: [],
    });

    useEffect(async() => {
        let response = await axiosInstance.get(
            `sales/${window.location.search}`
        );
        const allSales = response.data;
        setAppState({sales: allSales});
        console.log(response.data);
    }, [setAppState])

    return(
        <React.Fragment>
            SearchBar
        </React.Fragment>
    )
}

export default SalesSearchBar;
