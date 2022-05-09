import React from "react";
import SalesListItem from "./SalesListItem";
import {Container} from "@mui/material";


const SalesList = ( props ) => {

    const { sales } = props;

    return(
        <div>
            <Container component="main" maxWidth="xl">
                <h1>SalesList</h1>
                <div>
                    <ul>
                        {sales.map((sale, index) => (
                        <SalesListItem key={index} sale={sale} />
                    ))}
                    </ul>
                </div>
            </Container>
        </div>
    );
};


export default SalesList;
