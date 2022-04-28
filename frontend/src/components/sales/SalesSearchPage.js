import React, {useEffect, useState} from "react";
import axiosInstance from "../../axios";
import {Container} from '@mui/material';
import SalesList from "./SalesList";


const SalesSearchPage = () => {
    const [appState, setAppState] = useState({
		search: '',
		sales: [],
	});

    useEffect(() => {
        getSales();
    }, [setAppState])

        const getSales = () => {
        axiosInstance.get(`sales/${window.location.search}`)
            .then((response) => {
                console.log(`sales/${window.location.search}`);
                setAppState({sales: response.data});
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.status);
                }
            });
    }

    return(
        <React.Fragment>
            <SalesList sales={appState.sales} />
        </React.Fragment>
    )
}

export default SalesSearchPage;
