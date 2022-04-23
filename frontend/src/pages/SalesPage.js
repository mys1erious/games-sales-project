import React from "react";
import "../css/SalesPage.css";
import ListItem from "../components/ListItem";

import {Container} from "@material-ui/core";


const SalesPage = (props) => {

    const { sales } = props;

    return(
        <React.Fragment>
            <Container component="main" maxWidth="xl">
                <h1>SalesList</h1>
                <div>
                    <ul>
                        {sales.map((sale, index) => (
                        <ListItem key={index} sale={sale} />
                    ))}
                    </ul>
                </div>
            </Container>
        </React.Fragment>
    );
};


export default SalesPage;
