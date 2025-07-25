import React from 'react';
import { Backdrop, CircularProgress, Box, Typography } from '@mui/material';

const LoadingOverlay = ({ loading, message = 'Loading...' }) => {
    return (
        <Backdrop
            className="flex-center"
            sx={{ 
                color: '#fff', 
                zIndex: (theme) => theme.zIndex.drawer + 1,
                bgcolor: 'rgba(0, 0, 0, 0.7)'
            }}
            open={loading}
        >
            <Box className="flex-center" sx={{ flexDirection: 'column' }}>
                <div className="spinner mb-2"></div>
                <Typography variant="h6" className="text-primary" sx={{ color: 'white' }}>
                    {message}
                </Typography>
            </Box>
        </Backdrop>
    );
};

export default LoadingOverlay;