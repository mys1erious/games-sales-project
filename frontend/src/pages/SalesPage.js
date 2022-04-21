import React, { useState, useEffect } from "react";
import "../css/SalesPage.css";
import ListItem from "../components/ListItem";
import axiosInstance from "../axios";


const SalesPage = () => {

    let [sales, setSales] = useState([]);

    useEffect(() => {
        getSales();
    }, []);

    let getSales = async () => {
        let response = await axiosInstance.get('/sales');
        let data = await response.data;
        setSales(data);
    }

    return(
        <React.Fragment>
            <h1>SalesList</h1>
            <div>
                <ul>
                    {sales.map((sale, index) => (
                    <ListItem key={index} sale={sale} />
                ))}
                </ul>
            </div>
        </React.Fragment>
    );
}


export default SalesPage;
