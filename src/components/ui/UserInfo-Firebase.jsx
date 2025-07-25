import React from 'react';
import { Box, Typography, Chip } from '@mui/material';

const UserInfo = ({ userId }) => {
    if (!userId) return null;

    return (
        <Box className="card flex-between fade-in">
            <Box>
                <Typography variant="h6" className="text-primary mb-1">
                    Welcome back!
                </Typography>
                <Typography variant="body2" className="text-secondary">
                    User ID: {userId.substring(0, 8)}...
                </Typography>
            </Box>
            <Chip 
                label="Authenticated" 
                className="text-success"
                color="success" 
                variant="outlined" 
            />
        </Box>
    );
};

export default UserInfo;