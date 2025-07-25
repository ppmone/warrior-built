import React from 'react';
import { Alert, Fade } from '@mui/material';

const StatusMessage = ({ message, severity = 'info', show = true }) => {
    if (!message || !show) return null;

    return (
        <Fade in={show}>
            <Alert 
                severity={severity} 
                className="card fade-in mb-3"
                sx={{ borderRadius: '12px' }}
            >
                {message}
            </Alert>
        </Fade>
    );
};

export default StatusMessage;