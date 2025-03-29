import styles from './RecipesList.module.css';
import { SavedRecipe } from '../SavedRecipe/SavedRecipe';

export const RecipesList = ({ recipes, onDeleteRecipe, onModifyRecipe }) => {
  if (!recipes.length) return null;

  return (
    <>
      <h3 className={styles.formHeader}>Saved Recipes</h3>
      <div className={styles.recipesWrapper}>
        {recipes.map((recipe, index) => (
          <SavedRecipe
            key={recipe.id}
            ingredients={recipe.ingredients}
            allergens={recipe.allergens}
            cookingSteps={recipe.cookingSteps}
            photo={recipe.photo}
            onModify={() => onModifyRecipe(index)}
            onDelete={() => onDeleteRecipe(index)}
            index={index}
          />
        ))}
      </div>
    </>
  );
};
