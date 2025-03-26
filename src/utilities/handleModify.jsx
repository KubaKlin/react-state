export const handleModify = (
  index,
  recipes,
  setIngredients,
  setAllergens,
  setCookingSteps,
  setPhoto,
  handleDelete,
  setIsEditing,
) => {
  const recipeToModify = recipes[index];
  setIngredients(recipeToModify.ingredients);
  setAllergens(recipeToModify.allergens);
  setCookingSteps(recipeToModify.cookingSteps);
  setPhoto(recipeToModify.photo);

  handleDelete(index); // remove now edited recipe
  window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll to top after clicking 'modify'
  setIsEditing(true);
};
