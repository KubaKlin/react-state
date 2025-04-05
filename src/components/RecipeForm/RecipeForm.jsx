import { useState } from 'react';
import styles from './RecipeForm.module.css';
import { RecipeFormTextarea } from './RecipeFormTextarea';

export const RecipeForm = ({ onAddRecipe, editingRecipe, formState, onFormChange }) => {
  const [photoFile, setPhotoFile] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const newRecipe = {
      id: Date.now(),
      ...formState,
    };

    onAddRecipe(newRecipe);
    setPhotoFile('');
  };

  const handleIngredientsInputChange = (event) => {
    onFormChange('ingredients', event.target.value);
  };

  const handleAllergensInputChange = (event) => {
    onFormChange('allergens', event.target.value);
  };

  const handleCookingStepsInputChange = (event) => {
    onFormChange('cookingSteps', event.target.value);
  };

  const handlePhotoInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhotoFile(event.target.value);
      const reader = new FileReader();
      reader.onloadend = () => {
        onFormChange('photo', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h3 className={styles.formHeader}>Recipes bank</h3>
      <form onSubmit={handleSubmit} className={styles.formWrapper}>
        <RecipeFormTextarea
          name="ingredients"
          value={formState.ingredients}
          placeholder="Type ingredients"
          handleInputChange={handleIngredientsInputChange}
        />
        <RecipeFormTextarea
          name="allergens"
          value={formState.allergens}
          placeholder="Type allergens"
          handleInputChange={handleAllergensInputChange}
        />
        <RecipeFormTextarea
          name="cooking steps"
          value={formState.cookingSteps}
          placeholder="Type cooking steps"
          handleInputChange={handleCookingStepsInputChange}
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
          {editingRecipe ? 'Submit edit' : 'Submit new recipe'}
        </button>
      </form>
    </div>
  );
};
