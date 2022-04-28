import React from "react";
import "../css/SalesPage.css";

import {Container} from '@mui/material';

import SalesList from "../components/SalesList";


const SalesPage = (props) => {

    const { sales } = props;

    return(
        <React.Fragment>
            <SalesList sales={sales} />
        </React.Fragment>
    )
};


export default SalesPage;
