import React, { useState, useEffect } from "react";
import "../css/SalesPage.css";
import ListItem from "../components/ListItem";
import axios from "axios";


const EMAIL = 'admin@gmail.com';
const PASSWORD = 'admin'


const SalesPage = () => {

    let [sales, setSales] = useState([]);

    useEffect(() => {
        getSales();
    }, []);

    let getSales = async () => {
        let response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/v1/sales/`, {
            headers: {
                'Authorization': 'Basic ' + btoa(`${EMAIL}:${PASSWORD}`)
            }
        });
        let data = await response.data;

        setSales(data);
    }

    return(
        <div>
            <h1>SalesList</h1>
            <div>
                <ul>
                    {sales.map((sale, index) => (
                    <ListItem key={index} sale={sale} />
                ))}
                </ul>
            </div>
        </div>
    );
}


export default SalesPage;
