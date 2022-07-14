import React from 'react';
import {Grid} from "@mui/material";


const AuthGrid = ({content}) => {
    return (
         <Grid
                container
                rowSpacing={4}
                direction="column"
                alignItems="center"
                justifyContent="center"

                // For testing purposes
                sx={{border: 1}}
            >
             {content}
         </Grid>
    );
};


export default AuthGrid;
