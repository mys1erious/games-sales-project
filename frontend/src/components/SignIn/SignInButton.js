import React from 'react';
import {Button} from "@mui/material";

const SignInButton = ({buttonText, onClickFunc=null}) => {
    return(
        <div>
            <Button
                type='submit'
                variant='outlined'
                color='primary'
                size='medium'
                sx={{width: "50%"}}
                onClick={onClickFunc}
            >
                {buttonText}
            </Button>
        </div>
    );
};


export default SignInButton;