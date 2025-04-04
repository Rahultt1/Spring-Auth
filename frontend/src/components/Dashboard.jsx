import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';
import { jwtDecode } from 'jwt-decode'; // ✅ FIXED import

const Dashboard = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token); // ✅ FIXED usage
                setEmail(decodedToken.email || localStorage.getItem('email') || '');
                setFirstName(decodedToken.firstName || localStorage.getItem('firstName') || '');
                setLastName(decodedToken.lastName || localStorage.getItem('lastName') || '');
            } catch (error) {
                console.error('Error decoding token:', error);
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        localStorage.removeItem('email');
        navigate('/login');
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                    Welcome, {firstName} {lastName}!
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    Email: {email}
                </Typography>
                <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={handleLogout}
                    sx={{ mt: 3, mb: 2 }}
                >
                    Logout
                </Button>
            </Box>
        </Container>
    );
};

export default Dashboard;
