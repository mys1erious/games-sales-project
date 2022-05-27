import React, {useContext} from "react";
import SalesListItem from "./SalesListItem";
import {Container} from "@mui/material";
import {SalesContext} from "./SalesContext";


const SalesList = ({sales}) => {

    return(
        <div>
            <Container component="main">
                <div>
                    <ul>
                        {sales.map((sale, index) => (
                        <SalesListItem key={index} currSale={sale}/>
                    ))}
                    </ul>
                </div>
            </Container>
        </div>
    );
};


export default SalesList;
