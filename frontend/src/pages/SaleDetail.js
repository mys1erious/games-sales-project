import React, {useEffect, useState, useContext} from "react";
import { useNavigate, useParams} from "react-router-dom";

import {Button, IconButton, Collapse, Alert, Container} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import axiosInstance from "../components/Core/AxiosInstance";
import {SalesContext} from "../components/Sales/SalesContext";


const SaleDetail = () => {
    let navigate = useNavigate();

    const {sales, setSales} = useContext(SalesContext);

    let { saleUUID } = useParams();
    let [currSale, setCurrSale] = useState(null);
    let [isDeleted, setIsDeleted] = useState(false);
    let [isAlertOpen, setIsAlertOpen] = useState(false);

    useEffect(() => {
        getSale();
    }, [saleUUID]);

    let getSale = async() => {
        let response = await axiosInstance.get(`/sales/${saleUUID}/`);
        let data = response.data;
        setCurrSale(data);
    }

    let handleEdit = async() => {
        let response = await axiosInstance.put(`/sales/${saleUUID}/`, currSale)
        let data = response.data;
        setCurrSale(data);
    };

    let handleDelete = async() => {
        let response = await axiosInstance.delete(`/sales/${saleUUID}/`);
        console.log(response.data);

        setIsDeleted(true);
        setIsAlertOpen(true);

        // Do i need async? just testing for large amount of data
        setSales(sales.filter(sale => sale.uuid !== saleUUID));
    };

    return(
        <React.Fragment>
            {
                isDeleted
                    ?
                    <Collapse in={isAlertOpen}>
                        <Alert
                          action={
                            <IconButton
                              aria-label="close"
                              color="inherit"
                              size="small"
                              onClick={() => {
                                setIsAlertOpen(false);
                              }}
                            >
                              <CloseIcon fontSize="inherit" />
                            </IconButton>
                          }
                          sx={{ mb: 2 }}>
                          Sale has successfully been deleted !
                        </Alert>
                    </Collapse>
                    : null
            }
            <Container component="main" maxWidth="xl">
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
                    {JSON.stringify(currSale, null, 4)}
                </pre>
            </Container>

        </React.Fragment>
    )
}


export default SaleDetail;
