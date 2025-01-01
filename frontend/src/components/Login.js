// src/components/Login.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { login } from '../services/auth';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(username, password);
            onLogin(data);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
            <Typography variant="h6">Login</Typography>
            <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <TextField
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Button type="submit" variant="contained" color="primary">
                Login
            </Button>
        </Box>
    );
};

export default Login;
