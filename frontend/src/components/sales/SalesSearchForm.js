import React, {useState} from "react";

import {InputLabel, MenuItem, TextField, Select } from '@mui/material';
import {DatePicker} from "@mui/lab";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from "@mui/lab";


// Temp
const chartTypes = ['Bar', 'Pie', 'Line'];
const defaultChartType = chartTypes[0];


const SalesSearchForm = () => {
    const [selectedFromDate, setSelectedFromDate] = useState(new Date());
    const [selectedToDate, setSelectedToDate] = useState(new Date());
    const [selectedChartType, setSelectedChartType] = useState(defaultChartType);

    const handleFromDateChange = (date) => {
        console.log(date);
        setSelectedFromDate(date);
    };

    const handleToDateChange = (date) => {
        console.log(date);
        setSelectedToDate(date);
    };

    const handleChartTypeSelect = (e) => {
        console.log(e.target.value);
        setSelectedChartType(e.target.value);
    };

    return(
        <form noValidate>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    id='date_from'
                    name='date_from'
                    label="Date from*"
                    value={selectedFromDate}
                    onChange={handleFromDateChange}
                    renderInput={(params) => <TextField {...params} />}
                />
                <div />
                <DatePicker
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
    );
};


export default SalesSearchForm;
