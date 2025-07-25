import React from 'react';
import { Box } from '@mui/material';

const Layout = ({ children }) => {
    return (
        <Box 
            component="main" 
            className="container fade-in"
            sx={{ 
                minHeight: 'calc(100vh - 64px)', // Subtract header height
                py: 3 
            }}
        >
            {children}
        </Box>
    );
};

export default Layout;