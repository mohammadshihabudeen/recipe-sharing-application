// src/components/RecipeForm.js
import React, { useState } from 'react';
import api from '../services/api';

const RecipeForm = ({ onRecipeCreated }) => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('recipes/', {
                title,
                ingredients,
                instructions,
            });
            onRecipeCreated(response.data); // Call the callback to update the recipe list
            setTitle('');
            setIngredients('');
            setInstructions('');
        } catch (error) {
            console.error('Error creating recipe:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add a New Recipe</h2>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Ingredients:</label>
                <textarea
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Instructions:</label>
                <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Recipe</button>
        </form>
    );
};

export default RecipeForm;
