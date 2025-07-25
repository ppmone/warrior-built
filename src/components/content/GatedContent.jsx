import React from 'react';
import { Paper, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const GatedContent = () => {
    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: '12px', mb: 3 }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 2 }}>
                Exclusive Gated Content (Subscribers Only!)
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1 }}>
                Congratulations, subscriber! You now have access to our premium, exclusive content. This in-depth analysis reveals advanced techniques for personal finance management, including investment strategies, budgeting hacks, and long-term wealth building.
            </Typography>
            <List dense disablePadding sx={{ color: 'text.secondary', mb: 1, pl: 2 }}>
                <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: '30px' }}><CheckCircleOutlineIcon color="success" /></ListItemIcon>
                    <ListItemText primary="Advanced Investment Portfolios: Diversify like a pro." />
                </ListItem>
                <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: '30px' }}><CheckCircleOutlineIcon color="success" /></ListItemIcon>
                    <ListItemText primary="Automated Budgeting Systems: Save money effortlessly." />
                </ListItem>
                <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: '30px' }}><CheckCircleOutlineIcon color="success" /></ListItemIcon>
                    <ListItemText primary="Tax Optimization Secrets: Keep more of your earnings." />
                </ListItem>
                <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: '30px' }}><CheckCircleOutlineIcon color="success" /></ListItemIcon>
                    <ListItemText primary="Real Estate Insights: Profiting from property." />
                </ListItem>
            </List>
            <Typography variant="body1" sx={{ mt: 2, fontWeight: 'bold', color: 'text.primary' }}>
                Thank you for being a valued subscriber!
            </Typography>
        </Paper>
    );
};

export default GatedContent;