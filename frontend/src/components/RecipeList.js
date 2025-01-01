// src/components/RecipeList.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Card, CardContent, CardMedia } from '@mui/material';
import api from '../services/api';
import RecipeForm from './RecipeForm';

const RecipeList = ({ token }) => {
    const [recipes, setRecipes] = useState([]);
    const [editingRecipe, setEditingRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await api.get('recipes/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setRecipes(response.data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, [token]);

    const handleRecipeCreated = (newRecipe) => {
        setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
    };

    const handleRecipeUpdated = (updatedRecipe) => {
        setRecipes((prevRecipes) =>
            prevRecipes.map((recipe) =>
                recipe.id === updatedRecipe.id ? updatedRecipe : recipe
            )
        );
        setEditingRecipe(null);
    };

    const handleEditClick = (recipe) => {
        setEditingRecipe(recipe);
    };

    const handleDeleteClick = async (id) => {
        try {
            await api.delete(`recipes/${id}/`);
            setRecipes((prevRecipes) => prevRecipes.filter(recipe => recipe.id !== id));
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Recipe List
            </Typography>
            <RecipeForm 
                onRecipeCreated={handleRecipeCreated} 
                editingRecipe={editingRecipe} 
                onRecipeUpdated={handleRecipeUpdated} 
            />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {recipes.map(recipe => (
                    <Card key={recipe.id} sx={{ maxWidth: 345 }}>
                        {recipe.image && (
                            <CardMedia
                                component="img"
                                height="140"
                                image={`${recipe.image}`}
                                alt={recipe.title}
                            />
                        )}
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {recipe.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {recipe.ingredients}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {recipe.instructions}
                            </Typography>
                            <Button onClick={() => handleEditClick(recipe)} variant="outlined" color="primary" sx={{ mt: 1 }}>
                                Edit
                            </Button>
                            <Button onClick={() => handleDeleteClick(recipe.id)} variant="outlined" color="secondary" sx={{ mt: 1, ml: 1 }}>
                                Delete
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default RecipeList;
