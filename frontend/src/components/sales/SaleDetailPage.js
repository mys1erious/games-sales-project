import React, {useEffect, useState} from "react";
import { useNavigate, useParams} from "react-router-dom";
import axiosInstance from "../../axios";
import { Button } from '@mui/material';

const SaleDetailPage = () => {

    let navigate = useNavigate();
    let { saleUUID } = useParams();
    let [sale, setSale] = useState(null);

    useEffect(() => {
        getSale();
    }, [saleUUID]);
    
    let getSale = async() => {
        let response = await axiosInstance.get(`/sales/${saleUUID}/`);
        let data = response.data;
        setSale(data);
    }

    let handleEdit = async() => {
        let response = await axiosInstance.put(`/sales/${saleUUID}/`, sale)
        let data = response.data;
        setSale(data);
    };

    let handleDelete = async() => {
        let response = await axiosInstance.delete(`/sales/${saleUUID}/`);
    };

    // let saleFlatten = (item, dict={}) => {
    //     console.log(item);
    //     Object.keys(item).map((key, i) => (
    //         (typeof(item[key]) === "object")
    //             ? recPropsGetter(item[key], dict)
    //             : dict[key] = item[key]
    //     ));
    //     return dict;
    // };
    //
    // let saleDictBuilder = () => {
    //     const dict = recPropsGetter(sale);
    //     dict['uuid'] = saleUUID;
    //     return dict;
    // }

    return(
        <React.Fragment>
            <Button
                type='submit'
                size='medium'
                variant='contained'
                color='primary'
                onClick={() => navigate(-1)}>
                Back
            </Button>
            <Button
                type='submit'
                size='medium'
                variant='contained'
                color='primary'
                onClick={handleEdit}>
                Edit
            </Button>
            <Button
                type='submit'
                size='medium'
                variant='contained'
                color='primary'
                onClick={handleDelete}>
                Delete
            </Button>
            <h3>Sale info:</h3>
            <pre>
                {JSON.stringify(sale, null, 4)}
            </pre>
        </React.Fragment>
    )
}


export default SaleDetailPage;
