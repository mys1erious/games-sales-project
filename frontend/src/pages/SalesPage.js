import React, { useState, useEffect } from "react";
import "../css/SalesPage.css";


const EMAIL = 'admin@gmail.com'
const PASSWORD = 'admin'

const SalesPage = () => {

    let [sales, setSales] = useState([]);

    useEffect(() => {
        getSales();
    }, []);

    let getSales = async () => {
        let response = await fetch('/api/v1/sales/', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic' + btoa(`${EMAIL}:${PASSWORD}`)
            }
        });
        let data = await response.json();

        setSales(data);
    }

    return(
        <div>
            <h1>SalesList</h1>
            <div>
                {sales.map((sale, index) => (
                    <div key={index}>{sale.game.name}</div>
                ))}
            </div>
        </div>
    );
}


export default SalesPage;
