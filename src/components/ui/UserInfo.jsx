import React from 'react';
import { Typography, Box } from '@mui/material';

const UserInfo = ({ userId }) => {
    return (
        <Box sx={{ marginBottom: 2 }}>
            {userId ? (
                <Typography variant="body1">Logged in as: {userId}</Typography>
            ) : (
                <Typography variant="body1">Not logged in</Typography>
            )}
        </Box>
    );
};

export default UserInfo;