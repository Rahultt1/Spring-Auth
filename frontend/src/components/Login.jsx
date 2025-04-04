import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
    //         localStorage.setItem('token', response.data.token);
    //         navigate('/dashboard');
    //     } catch (error) {
    //         console.error('Login failed', error);
    //     }
    // };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
            const { token, userId, email: userEmail, firstName, lastName } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            localStorage.setItem('email', userEmail);
            localStorage.setItem('firstName', firstName);
            localStorage.setItem('lastName', lastName);

            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed', error.response ? error.response.data : error.message);
            alert('Login failed. Please check your credentials.');
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/google-login', {
                token: credentialResponse.credential
            });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId); // Add this line
            localStorage.setItem('firstName', response.data.firstName);
            localStorage.setItem('lastName', response.data.lastName);
            localStorage.setItem('email', response.data.email);
            navigate('/dashboard');
        } catch (error) {
            console.error('Google login failed', error.response ? error.response.data : error.message);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">Sign in</Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign In</Button>
                </Box>
                <GoogleLogin
                    clientId="507608362836-3qe3nq4n5900e3559f1v6udf4mk47g2q.apps.googleusercontent.com"
                    onSuccess={handleGoogleSuccess}
                    onError={() => console.log('Google Login Failed')}
                    redirectUri="http://localhost:5173/login"
                />
            </Box>
        </Container>
    );
};

export default Login;