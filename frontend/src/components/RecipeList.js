// src/components/RecipeList.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import RecipeForm from './RecipeForm';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [editingRecipe, setEditingRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await api.get('recipes/');
                setRecipes(response.data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, []);

    const handleRecipeCreated = (newRecipe) => {
        setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
    };

    const handleRecipeUpdated = (updatedRecipe) => {
        setRecipes((prevRecipes) =>
            prevRecipes.map((recipe) =>
                recipe.id === updatedRecipe.id ? updatedRecipe : recipe
            )
        );
        setEditingRecipe(null); // Reset editing state
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
        <div>
            <h1>Recipe List</h1>
            <RecipeForm 
                onRecipeCreated={handleRecipeCreated} 
                editingRecipe={editingRecipe} 
                onRecipeUpdated={handleRecipeUpdated} 
            />
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.id}>
                        <h2>{recipe.title}</h2>
                        {recipe.image && (
                            <img 
                                src={`${recipe.image}`} 
                                alt={recipe.title} 
                                style={{ width: '200px', height: 'auto' }} 
                            />
                        )}
                        <p>{recipe.ingredients}</p>
                        <p>{recipe.instructions}</p>
                        <button onClick={() => handleEditClick(recipe)}>Edit</button>
                        <button onClick={() => handleDeleteClick(recipe.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;
