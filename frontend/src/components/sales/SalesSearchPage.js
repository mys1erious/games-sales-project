import React, {useEffect, useState} from "react";
import axiosInstance from "../../axios";
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
        console.log(`sales/${window.location.search}`)
        axiosInstance.get(`sales/${window.location.search}`)
            .then((response) => {
                setAppState({sales: response.data});
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.status);
                }
            })
    }

    return(
        <React.Fragment>
            <SalesList sales={appState.sales} />
        </React.Fragment>
    )
}

export default SalesSearchPage;
