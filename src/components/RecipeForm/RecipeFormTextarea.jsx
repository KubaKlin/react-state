import styles from './RecipeForm.module.css';

export const RecipeFormTextarea = ({
  handleIngredientsInputChange,
  value,
  placeholder,
  name,
}) => {
  return (
    <>
      <label htmlFor="ingredients" className={styles.formLabel}>
        {`Recipe ${name}`}
      </label>
      <textarea
        name={name}
        onChange={handleIngredientsInputChange}
        value={value}
        placeholder={placeholder}
        className={styles.formInput}
        required={true}
      />
    </>
  );
};
