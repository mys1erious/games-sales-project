import React, {useEffect, useState} from "react";
import { useNavigate, useParams} from "react-router-dom";
import axios from "axios";


const EMAIL = 'admin@gmail.com'
const PASSWORD = 'admin'

const sampleJSON = {
    "name": "Pluralsight",
    "number": 1,
    "address": "India",
    "website": "https://www.pluralsight.com/"
}
const SaleDetailPage = () => {

    let navigate = useNavigate();
    let { saleUUID } = useParams();
    let [sale, setSale] = useState(null);

    useEffect(() => {
        getSale();
    }, [saleUUID]);

    let getSale = async() => {
        let response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/api/v1/sales/${saleUUID}/`,
            {
                headers: {
                    'Authorization': 'Basic ' + btoa(`${EMAIL}:${PASSWORD}`)
                },
            });
        let data = await response.data;
        setSale(data);
    }

    // try Recursive function to get data
    return(
        <div>
            <button onClick={() => navigate(-1)}>Back</button>
            <h3>Sale info:</h3>
            <pre>
                <code>{JSON.stringify(sale, null, 4)}</code>

                {/*
                    x3 to test scrolling
                */}
                <code>{JSON.stringify(sale, null, 4)}</code>
                <code>{JSON.stringify(sale, null, 4)}</code>
            </pre>
        </div>
    )
}


export default SaleDetailPage;
