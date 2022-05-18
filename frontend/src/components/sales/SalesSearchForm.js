import React, {useState} from "react";

import {InputLabel, MenuItem, TextField, Select } from '@mui/material';
import {DatePicker} from "@mui/lab";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from "@mui/lab";
import SearchBar from "../core/SearchBar";
import {useNavigate} from "react-router-dom";


// Temp
const chartTypes = ['Bar', 'Pie', 'Line'];
const defaultChartType = chartTypes[0];


const SalesSearchForm = () => {
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFromDate, setSelectedFromDate] = useState(
        new Date().setFullYear(1900)
    );
    const [selectedToDate, setSelectedToDate] = useState(new Date());
    const [selectedChartType, setSelectedChartType] = useState(defaultChartType);

    const handleFromDateChange = (date) => {
        setSelectedFromDate(date);
    };

    const handleToDateChange = (date) => {
        setSelectedToDate(date);
    };

    const handleChartTypeSelect = (e) => {
        setSelectedChartType(e.target.value);
    };

    const goSearch = () => {
        let pathname = '/sales/search/';

        let queryParams = {
            'value': '',
            'yor_gt': '',
            'yor_lt': '',
        };

        if (searchQuery) {
            queryParams['value'] = searchQuery;
        }
        if (selectedFromDate) {
            queryParams['yor_gt'] = selectedFromDate;
        }
        // if (selectedToDate) {
        //     queryParams['yor_lt'] = selectedToDate.getFullYear();
        // }

        // const searchUrlBuilder = (queryParams) => {
        //     let searchUrl = '';
        //     for (const key in queryParams) {
        //         if (!searchUrl) {
        //             searchUrl = '?'
        //         }
        //     }
        //     return searchUrl;
        // }

        const searchUrl = `?value=${searchQuery}` //searchUrlBuilder(queryParams);

        navigate({
            pathname: pathname,
            search: searchUrl
        });
        console.log(`${pathname}${searchUrl} \n
        ${typeof(selectedFromDate)}`);
    };


    return(
        <React.Fragment>
        <SearchBar
            searchQuery={searchQuery} setSearchQuery={setSearchQuery}
            onRequestSearch={() => goSearch()}
        />
        <form noValidate>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    views={['year']}
                    id='date_from'
                    name='date_from'
                    label="Date from*"
                    value={selectedFromDate}
                    onChange={handleFromDateChange}
                    renderInput={(params) => <TextField {...params} />}
                />
                <div />
                <DatePicker
                    views={['year']}
                    id='date_to'
                    name='date_to'
                    label="Date to*"
                    value={selectedToDate}
                    onChange={handleToDateChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <InputLabel id="chart_type_select_label">Chart type</InputLabel>
            <Select
                labelId="chart_type_select_label"
                id="chart_type_select"
                value={selectedChartType}
                label="Chart type"
                onChange={handleChartTypeSelect}
                >
                {chartTypes.map((chart, index) => (
                    <MenuItem key={index} value={chart}>{chart}</MenuItem>
                ))}
            </Select>
        </form>
        </React.Fragment>
    );
};


export default SalesSearchForm;
