import { useState } from 'react';
import { RecipeForm } from '../RecipeForm/RecipeForm';
import { RecipesList } from '../RecipesList/RecipesList';
import {
  getRecipesFromStorage,
  setRecipesInStorage,
} from '../../utilities/recipesInLocalStorage';

export const RecipesManager = () => {
  const [recipes, setRecipes] = useState(getRecipesFromStorage);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [formState, setFormState] = useState({
    ingredients: '',
    allergens: '',
    cookingSteps: '',
    photo: '',
  });

  const handleAddRecipe = (newRecipe) => {
    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    setRecipesInStorage(updatedRecipes);
    setEditingRecipe(null);
    setFormState({
      ingredients: '',
      allergens: '',
      cookingSteps: '',
      photo: '',
    });
  };

  const handleDeleteRecipe = (index) => {
    const updatedRecipes = recipes.filter(
      (recipe, recipeIndex) => recipeIndex !== index,
    );
    setRecipes(updatedRecipes);
    setRecipesInStorage(updatedRecipes);
    setEditingRecipe(null);
  };

  const handleModifyRecipe = (index) => {
    const recipeToModify = recipes[index];
    handleDeleteRecipe(index);
    setEditingRecipe(recipeToModify);
    setFormState({
      ingredients: recipeToModify.ingredients,
      allergens: recipeToModify.allergens,
      cookingSteps: recipeToModify.cookingSteps,
      photo: recipeToModify.photo,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormChange = (field, value) => {
    setFormState(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div>
      <RecipeForm 
        onAddRecipe={handleAddRecipe} 
        editingRecipe={editingRecipe}
        formState={formState}
        onFormChange={handleFormChange}
      />
      <RecipesList
        recipes={recipes}
        onDeleteRecipe={handleDeleteRecipe}
        onModifyRecipe={handleModifyRecipe}
      />
    </div>
  );
};
