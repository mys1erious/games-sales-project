import React, {useEffect, useState} from "react";
import axiosInstance from "../axios";
import {Container} from "@material-ui/core";
import ListItem from "../components/ListItem";


const SalesSearchPage = () => {
    const search = 'name';

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
            <Container component="main" maxWidth="xl">
                <h1>SalesList</h1>
                <div>
                    <ul>
                        {appState.sales.map((sale, index) => (
                        <ListItem key={index} sale={sale} />
                    ))}
                    </ul>
                </div>
            </Container>
        </React.Fragment>
    )
}

export default SalesSearchPage;
