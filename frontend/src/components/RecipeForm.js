// src/components/RecipeForm.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';

const RecipeForm = ({ onRecipeCreated, editingRecipe, onRecipeUpdated }) => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (editingRecipe) {
            setTitle(editingRecipe.title);
            setIngredients(editingRecipe.ingredients);
            setInstructions(editingRecipe.instructions);
            setImage(editingRecipe.image); // Set the image if editing
        } else {
            setTitle('');
            setIngredients('');
            setInstructions('');
            setImage(null);
        }
    }, [editingRecipe]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('ingredients', ingredients);
        formData.append('instructions', instructions);
        if (image) {
            formData.append('image', image);
        }

        if (editingRecipe) {
            // Update existing recipe
            try {
                const response = await api.put(`recipes/${editingRecipe.id}/`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                onRecipeUpdated(response.data);
            } catch (error) {
                console.error('Error updating recipe:', error);
            }
        } else {
            // Create new recipe
            try {
                const response = await api.post('recipes/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                onRecipeCreated(response.data);
            } catch (error) {
                console.error('Error creating recipe:', error);
            }
        }
        // Reset form fields
        setTitle('');
        setIngredients('');
        setInstructions('');
        setImage(null);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{editingRecipe ? 'Edit Recipe' : 'Add a New Recipe'}</h2>
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
            <div>
                <label>Image:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
            </div>
            <button type="submit">{editingRecipe ? 'Update Recipe' : 'Add Recipe'}</button>
        </form>
    );
};

export default RecipeForm;
