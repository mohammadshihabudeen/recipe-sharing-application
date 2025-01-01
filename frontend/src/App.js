// src/App.js
import React, { useState } from 'react';
import RecipeList from './components/RecipeList';
import Login from './components/Login';

const App = () => {
    const [token, setToken] = useState(null);

    const handleLogin = (data) => {
        setToken(data.access); // Store the access token
        localStorage.setItem('token', data.access); // Optionally store in local storage
    };

    return (
        <div>
            {token ? (
                <RecipeList token={token} />
            ) : (
                <Login onLogin={handleLogin} />
            )}
        </div>
    );
};

export default App;
