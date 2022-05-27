import React from 'react';
import { useState } from "react";

import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";


const SalesSearchBar = ({setSearchQuery, onRequestSearch}) => {

    return(
        <form>
            <TextField
              id="search-bar"
              className="text"
              onInput={(e) => {
                setSearchQuery(e.target.value);
              }}
              label="Enter a value"
              variant="outlined"
              placeholder="Search..."
              size="small"
            />
            <IconButton
                type="submit"
                aria-label="search"
                onClick={onRequestSearch}
            >
              <SearchIcon style={{ fill: "blue" }} />
            </IconButton>
        </form>
    );
}


export default SalesSearchBar;
