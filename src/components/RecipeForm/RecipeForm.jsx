import { useState } from 'react';
import styles from './RecipeForm.module.css';
import { SavedRecipe } from '../SavedRecipe/SavedRecipe';
import { RecipeFormTextarea } from './RecipeFormTextarea';

export const RecipeForm = () => {
  const [ingredients, setIngredients] = useState('');
  const [allergens, setAllergens] = useState('');
  const [cookingSteps, setCookingSteps] = useState('');
  const [photo, setPhoto] = useState('');
  const [photoFile, setPhotoFile] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const [recipes, setRecipes] = useState(() => {
    try {
      const savedRecipes = JSON.parse(localStorage.getItem('recipes'));
      return savedRecipes ?? [];
    } catch {
      return [];
    }
  });

  const handleSubmit = (event) => {
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
    setPhotoFile('');
    setIsEditing(false);
  };

  const handleModify = (index) => {
    const recipeToModify = recipes[index];
    setIngredients(recipeToModify.ingredients);
    setAllergens(recipeToModify.allergens);
    setCookingSteps(recipeToModify.cookingSteps);
    setPhoto(recipeToModify.photo);

    handleDelete(index); // remove now edited recipe
    window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll to top after clicking 'modify'
    setIsEditing(true);
  };


  const handleIngredientsInputChange = (event) => {
    setIngredients(event.target.value);
  };

  const handleAllergensInputChange = (event) => {
    setAllergens(event.target.value);
  };

  const handleCookingStepsInputChange = (event) => {
    setCookingSteps(event.target.value);
  };

  const handlePhotoInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhotoFile(event.target.value);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result); // Base64 coded image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (index) => {
    const updatedRecipes = recipes.filter(
      (recipe, recipeIndex) => recipeIndex !== index,
    );
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  };

  return (
    <>
      <h3 className={styles.formHeader}>Recipes bank</h3>
      <form onSubmit={handleSubmit} className={styles.formWrapper}>
        <RecipeFormTextarea
          name="ingredients"
          value={ingredients}
          placeholder="Type ingredients"
          handleIngredientsInputChange={handleIngredientsInputChange}
        />
        <RecipeFormTextarea
          name="allergens"
          value={allergens}
          placeholder="Type allergens"
          handleIngredientsInputChange={handleAllergensInputChange}
        />
        <RecipeFormTextarea
          name="cooking steps"
          value={cookingSteps}
          placeholder="Type cooking steps"
          handleIngredientsInputChange={handleCookingStepsInputChange}
        />
        <label htmlFor="photo" className={styles.formLabel}>
          Recipe photo
        </label>
        <input
          type="file"
          name="photo"
          onChange={handlePhotoInputChange}
          value={photoFile}
          className={styles.formInputPhoto}
        />
        <button type="submit" className={styles.formSubmit}>
          {isEditing ? 'Submit edit' : 'Submit new recipe'}
        </button>
      </form>

      {recipes.length && <h3 className={styles.formHeader}>Saved Recipes</h3>}
      <div className={styles.recipesWrapper}>
      {recipes.map((recipe, index) => (
        <SavedRecipe
          key={recipe.id}
          ingredients={recipe.ingredients}
          allergens={recipe.allergens}
          cookingSteps={recipe.cookingSteps}
          photo={recipe.photo}
          handleModify={handleModify}
          handleDelete={handleDelete}
          index={index}
        />
      ))}
      </div>
    </>
  );
};
