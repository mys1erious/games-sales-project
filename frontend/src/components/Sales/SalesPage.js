import React, {useState, useEffect, useContext} from "react";
import {useNavigate} from "react-router-dom";

import {Box, Container, Grid, Pagination, Typography} from "@mui/material";

import DataLoadingItem from "../Core/DataLoadingItem";
import axiosInstance from "../Core/AxiosBase";
import {SalesContext} from "./SalesContext";
import SalesList from "./SalesList";


const SalesPage = () => {
    const navigate = useNavigate();

    const {sales, setSales} = useContext(SalesContext);
    const [currPage, setCurrPage] = useState(1);
    const [numPages, setNumPages] = useState(1);

    useEffect(() => {
        getSales();
        navigate(`/sales/?page=${currPage}`);

    }, [currPage]);

    useEffect(() => {

    }, [])

    // Get numPages only on first load? cache in memo?
    const getSales = () => {
        axiosInstance.get(`/sales/?page=${currPage}`)
            .then((response) => {
                setSales(response.data.sales);
                setNumPages(response.data.num_pages);
            })
    };
    
    const changePage = (e, p) => {
        setCurrPage(p);
        };

    return(
        <React.Fragment>
            {
                sales ?
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                    >
                        <Grid item><h1>Sales List</h1></Grid>
                        <Grid item><SalesList sales={sales} /></Grid>

                        <Grid item marginTop={"20px"}>
                            <Typography >Page: {currPage}</Typography>
                            <Pagination
                                boundaryCount={0}
                                siblingCount={1}
                                color="primary"
                                count={numPages}
                                showFirstButton
                                showLastButton
                                onChange={changePage}/>
                        </Grid>
                    </Grid>
                    :
                    <DataLoadingItem />
            }
        </React.Fragment>
    )
};


export default SalesPage;
