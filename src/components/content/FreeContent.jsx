import React from 'react';
import { Paper, Typography, Box, Grid, Container } from '@mui/material';

const FreeContent = () => {
    return (
        <Box sx={{ width: '100vw', backgroundColor: '#f0f2f5', py: 4, margin: 0 }}>
            <Container 
                maxWidth={false} 
                sx={{ 
                    maxWidth: '100%', 
                    px: 3,
                    margin: '0 auto',
                    width: '100%'
                }}
            >
                <Paper elevation={3} className="card fade-in" sx={{ width: '100%', margin: 0 }}>
                    <Typography variant="h5" component="h2" className="text-primary mb-2" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
                        Free Content Available to Everyone
                    </Typography>
                    
                    <Grid container spacing={3}>
                        {/* First Section - Double width (8/12) */}
                        <Grid item xs={12} md={8}>
                            <Box>
                                <Typography variant="body1" className="text-secondary mb-2" sx={{ marginBottom: '16px' }}>
                                    Welcome to our content hub! Here's some valuable information that's freely available to all visitors. 
                                    This content covers basic personal finance tips, general wellness advice, and introductory strategies 
                                    for building a better life.
                                </Typography>
                                
                                <Box className="mb-2">
                                    <Typography variant="h6" className="text-primary mb-1" sx={{ fontWeight: 'medium', marginBottom: '8px' }}>
                                        What you'll learn:
                                    </Typography>
                                    <Typography variant="body2" className="text-secondary mb-1" sx={{ marginBottom: '4px' }}>
                                        • Basic budgeting fundamentals
                                    </Typography>
                                    <Typography variant="body2" className="text-secondary mb-1" sx={{ marginBottom: '4px' }}>
                                        • Simple saving strategies
                                    </Typography>
                                    <Typography variant="body2" className="text-secondary mb-1" sx={{ marginBottom: '4px' }}>
                                        • Introduction to investing concepts
                                    </Typography>
                                    <Typography variant="body2" className="text-secondary mb-1" sx={{ marginBottom: '4px' }}>
                                        • Healthy lifestyle basics
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        
                        {/* Second Section - Single width (4/12) */}
                        <Grid item xs={12} md={4}>
                            <Box 
                                sx={{ 
                                    backgroundColor: 'var(--blueGrey-50)', 
                                    padding: '16px', 
                                    borderRadius: '8px',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center'
                                }}
                            >
                                <Typography variant="h6" className="text-primary" sx={{ fontWeight: 'bold', marginBottom: '12px' }}>
                                    Ready for More?
                                </Typography>
                                <Typography variant="body1" className="text-primary" sx={{ fontWeight: 'medium' }}>
                                    Want access to our premium, in-depth content? Subscribe to unlock exclusive insights and advanced strategies!
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
};

export default FreeContent;