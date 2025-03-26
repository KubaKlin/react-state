export const handleSubmit = (
  event,
  recipes,
  ingredients,
  allergens,
  cookingSteps,
  photo,
  setRecipes,
  setIngredients,
  setAllergens,
  setCookingSteps,
  setPhoto,
  setIsEditing,
) => {
  event.preventDefault();

  const newRecipe = {
    id: Date.now(),
    ingredients,
    allergens,
    cookingSteps,
    photo,
  };
  const updatedRecipes = [...recipes, newRecipe];
  setRecipes(updatedRecipes);
  localStorage.setItem('recipes', JSON.stringify(updatedRecipes));

  // clearing the fields after submit
  setIngredients('');
  setAllergens('');
  setCookingSteps('');
  setPhoto('');
  setIsEditing(false);
};
