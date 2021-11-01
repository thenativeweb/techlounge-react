import { Recipe } from '../types/Recipe';

interface RecipeApi {
  fetchAllRecipes: () => Promise<Recipe[]>;
}

export {
  RecipeApi
};
