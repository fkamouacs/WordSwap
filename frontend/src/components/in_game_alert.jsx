import React, { useState } from 'react';
import {Alert, Button, Stack} from '@mui/material';

export default function InGameAlert({show,alertMessage}) {



    return (
        <>
            <Alert 
            icon={false} 
            style={{ 
                display: show? "block" : "none" , 
                position: 'fixed', 
                top: '21%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                zIndex: 9999 }}
            className={show ? '' : 'fade-out'}>
                {alertMessage}
            </Alert>
        </>
    );
}
