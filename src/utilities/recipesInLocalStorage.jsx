const recipesLocalStorageKey = 'recipes';

export function setRecipesInStorage(newRecipes) {
  localStorage.setItem(recipesLocalStorageKey, JSON.stringify(newRecipes));
}

export function getRecipesFromStorage() {
  try {
    return JSON.parse(localStorage.getItem(recipesLocalStorageKey)) || [];
  } catch {
    return [];
  }
}
