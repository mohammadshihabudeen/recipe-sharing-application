// src/App.js
import React, { useState } from 'react';
import RecipeList from './components/RecipeList';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
    const [token, setToken] = useState(null);
    const [isRegistering, setIsRegistering] = useState(false);

    const handleLogin = (data) => {
        setToken(data.access);
        localStorage.setItem('token', data.access);
    };

    return (
        <div>
            {token ? (
                <RecipeList token={token} />
            ) : isRegistering ? (
                <Register />
            ) : (
                <Login onLogin={handleLogin} />
            )}
            <button onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? 'Back to Login' : 'Register'}
            </button>
        </div>
    );
};

export default App;
