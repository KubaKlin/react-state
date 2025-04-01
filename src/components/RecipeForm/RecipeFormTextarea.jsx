import styles from './RecipeForm.module.css';

export const RecipeFormTextarea = ({
  handleIngredientsInputChange,
  value,
  placeholder,
  name,
}) => {
  return (
    <div className={styles.inputWrapper}>
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
    </div>
  );
};
