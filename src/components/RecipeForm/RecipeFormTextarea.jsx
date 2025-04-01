import styles from './RecipeForm.module.css';

export const RecipeFormTextarea = ({
  handleInputChange,
  value,
  placeholder,
  name,
}) => {
  return (
    <div className={styles.inputWrapper}>
      <label className={styles.formLabel}>
        {`Recipe ${name}`}
      </label>
      <textarea
        name={name}
        onChange={handleInputChange}
        value={value}
        placeholder={placeholder}
        className={styles.formInput}
        required={true}
      />
    </div>
  );
};
