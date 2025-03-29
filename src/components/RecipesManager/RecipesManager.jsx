import { useState } from 'react';
import { RecipeForm } from '../RecipeForm/RecipeForm';
import {
  getRecipesFromStorage,
  setRecipesInStorage,
} from '../../utilities/recipesInLocalStorage';

export const RecipesManager = () => {
  const [recipes, setRecipes] = useState(getRecipesFromStorage);

  const handleAddRecipe = (newRecipe) => {
    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    setRecipesInStorage(updatedRecipes);
  };

  const handleDeleteRecipe = (index) => {
    const updatedRecipes = recipes.filter(
      (recipe, recipeIndex) => recipeIndex !== index,
    );
    setRecipes(updatedRecipes);
    setRecipesInStorage(updatedRecipes);
  };

  const handleModifyRecipe = (index) => {
    const recipeToModify = recipes[index];
    handleDeleteRecipe(index);
    return recipeToModify;
  };

  return (
    <RecipeForm
      onAddRecipe={handleAddRecipe}
      onModifyRecipe={handleModifyRecipe}
      recipes={recipes}
      onDeleteRecipe={handleDeleteRecipe}
    />
  );
};
