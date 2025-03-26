import { useState, useEffect } from 'react';
import styles from './RecipeForm.module.css';
import { SavedRecipe } from '../SavedRecipe/SavedRecipe';
import { RecipeFormTextarea } from './RecipeFormTextarea';
import { handleModify } from '../../utilities/handleModify';
import { handleSubmit } from '../../utilities/handleSubmit';

export const RecipeForm = () => {
  const [ingredients, setIngredients] = useState('');
  const [allergens, setAllergens] = useState('');
  const [cookingSteps, setCookingSteps] = useState('');
  const [photo, setPhoto] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const onSubmitHandler = (event) => {
    handleSubmit(
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
    );
  };

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    setRecipes(savedRecipes);
  }, []);

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
      <form onSubmit={onSubmitHandler} className={styles.formWrapper}>
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
          className={styles.formInputPhoto}
        />
        <button type="submit" className={styles.formSubmit}>
          {isEditing ? 'Submit edit' : 'Submit new recipe'}
        </button>
      </form>

      {recipes.length && <h3 className={styles.formHeader}>Saved Recipes</h3>}
      {recipes.map((recipe, index) => (
        <SavedRecipe
          key={recipe.id}
          ingredients={recipe.ingredients}
          allergens={recipe.allergens}
          cookingSteps={recipe.cookingSteps}
          photo={recipe.photo}
          handleModify={() =>
            handleModify(
              index,
              recipes,
              setIngredients,
              setAllergens,
              setCookingSteps,
              setPhoto,
              handleDelete,
              setIsEditing,
            )
          }
          handleDelete={handleDelete}
          index={index}
        />
      ))}
    </>
  );
};
