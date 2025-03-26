import styles from './SavedRecipe.module.css';

export const SavedRecipe = ({
  handleDelete,
  handleModify,
  index,
  ingredients,
  allergens,
  cookingSteps,
  photo,
}) => {
  return (
    <div className={styles.recipeItem}>
      {photo && (
        <div>
          <img src={photo} alt="Recipe" className={styles.recipePhoto} />
        </div>
      )}
      <div className={styles.recipeItemContentWrapper}>
        <p className={styles.paragraph}>
          <strong>Ingredients:</strong> {ingredients}
        </p>
        <p className={styles.paragraph}>
          <strong>Allergens:</strong> {allergens}
        </p>
        <p className={styles.paragraph}>
          <strong>Steps:</strong> {cookingSteps}
        </p>
        <button
          onClick={() => handleDelete(index)}
          className={styles.deleteButton}
        >
          Delete
        </button>
        <button
          onClick={() => handleModify(index)}
          className={styles.modifyButton}
        >
          Modify
        </button>
      </div>
    </div>
  );
};
