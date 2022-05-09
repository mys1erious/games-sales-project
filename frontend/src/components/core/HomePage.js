import React from "react";
import "./HomePage.css";

import SalesSearchForm from "../sales/SalesSearchForm";


const HomePage = () => {
    return(
        <React.Fragment>
            Home Page
            <div>
                <SalesSearchForm />
            </div>

        </React.Fragment>
    )
}


export default HomePage;
