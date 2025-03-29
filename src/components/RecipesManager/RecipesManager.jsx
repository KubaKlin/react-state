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

  const handleAddRecipe = (newRecipe) => {
    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    setRecipesInStorage(updatedRecipes);
    setEditingRecipe(null);
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
  };

  return (
    <>
      <RecipeForm onAddRecipe={handleAddRecipe} editingRecipe={editingRecipe} />
      <RecipesList
        recipes={recipes}
        onDeleteRecipe={handleDeleteRecipe}
        onModifyRecipe={handleModifyRecipe}
      />
    </>
  );
};
