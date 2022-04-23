import React, {useEffect, useState} from "react";
import { useNavigate, useParams} from "react-router-dom";
import axiosInstance from "../axios";


const SaleDetailPage = () => {

    let navigate = useNavigate();
    let { saleUUID } = useParams();
    let [sale, setSale] = useState(null);

    useEffect(() => {
        getSale();
    }, [saleUUID]);

    let getSale = async() => {
        let response = await axiosInstance.get(`/sales/${saleUUID}/`);
        let data = await response.data;
        setSale(data);
    }

    // try Recursive function to get data
    return(
        <React.Fragment>
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
        </React.Fragment>
    )
}


export default SaleDetailPage;
