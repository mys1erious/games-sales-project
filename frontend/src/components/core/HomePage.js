import React from "react";
import "../css/HomePage.css";

import "../components/SalesSearchForm";
import SalesSearchForm from "../components/SalesSearchForm";


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
