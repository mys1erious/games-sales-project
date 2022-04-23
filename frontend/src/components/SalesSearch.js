import React, {useEffect, useState} from "react";
import axiosInstance from "../axios";


const SalesSearch = () => {
    const search = 'name';
    const [appState, setAppState] = useState({
        search: '',
        sales: [],
    });

    useEffect(() => {
        axiosInstance.get(`sales/${window.location.search}`).then((response) => {
            console.log(`sales/${window.location.search}`);
            const allSales = response.data;
            setAppState({ sales: allSales });
            console.log(response.data);
        });
    }, [setAppState])

    return(
        <React.Fragment>

		</React.Fragment>
    )
}

export default SalesSearch;
