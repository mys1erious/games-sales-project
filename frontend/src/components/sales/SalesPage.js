import React from "react";
import "./SalesPage.css";


import SalesList from "./SalesList";
import {Container} from "@mui/material";


const SalesPage = (props) => {

    const { sales } = props;

    return(
        <React.Fragment>
            <Container component="main" maxWidth="sm">
                <SalesList sales={sales} />
            </Container>
        </React.Fragment>
    )
};


export default SalesPage;
