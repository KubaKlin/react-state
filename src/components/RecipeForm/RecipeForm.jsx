import { useState, useEffect } from 'react';
import styles from './RecipeForm.module.css';
import { RecipeFormTextarea } from './RecipeFormTextarea';

export const RecipeForm = ({ onAddRecipe, editingRecipe }) => {
  const [ingredients, setIngredients] = useState('');
  const [allergens, setAllergens] = useState('');
  const [cookingSteps, setCookingSteps] = useState('');
  const [photo, setPhoto] = useState('');
  const [photoFile, setPhotoFile] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (editingRecipe) {
      setIngredients(editingRecipe.ingredients);
      setAllergens(editingRecipe.allergens);
      setCookingSteps(editingRecipe.cookingSteps);
      setPhoto(editingRecipe.photo);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [editingRecipe]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newRecipe = {
      id: Date.now(),
      ingredients,
      allergens,
      cookingSteps,
      photo,
    };

    onAddRecipe(newRecipe);

    // clearing the fields after submit
    setIngredients('');
    setAllergens('');
    setCookingSteps('');
    setPhoto('');
    setPhotoFile('');
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
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
    </>
  );
};
