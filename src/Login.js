// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Card, CardContent, Typography, Box } from '@mui/material';

const Login = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Attempting to log in with:", credentials);
        const response = await fetch('https://cloudconnectcampaign.com/espicrmnew/api/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        if (response.ok) {
            const data = await response.json();
            console.log("Login successful, received tokens:", data);
            localStorage.setItem('authToken', data.access); // Store access token
            localStorage.setItem('refreshToken', data.refresh); // Store refresh token
            onLogin(data.access); // Pass access token to handleLogin
            navigate("/Dashboard", { replace: true }); // Navigate to dashboard
        } else {
            const errorData = await response.json();
            console.error("Login failed", errorData);
            alert('Login failed! Please check your username and password.');
        }
    };

    return (
        <Card sx={{ maxWidth: 345, mx: 'auto', mt: 10 }}>
            <CardContent>
                <Typography variant="h5">Login</Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={credentials.username}
                        onChange={handleChange}
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
                        value={credentials.password}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default Login;
