// src/components/RecipeForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
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
            setImage(editingRecipe.image);
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
        setTitle('');
        setIngredients('');
        setInstructions('');
        setImage(null);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
            <Typography variant="h6">{editingRecipe ? 'Edit Recipe' : 'Add a New Recipe'}</Typography>
            <TextField
                label="Title"
                variant="outlined"
                fullWidth
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <TextField
                label="Ingredients"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                required
            />
            <TextField
                label="Instructions"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                required
            />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                {editingRecipe ? 'Update Recipe' : 'Add Recipe'}
            </Button>
        </Box>
    );
};

export default RecipeForm;
