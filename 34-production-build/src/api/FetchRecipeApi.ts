import { Recipe } from '../types/Recipe';
import { RecipeApi } from './RecipeApi';

const endpoint = RECIPE_API_ENDPOINT;

const createFetchRecipeApi = (): RecipeApi => ({
  async fetchAllRecipes (): Promise<Recipe[]> {
    return await fetch(`${endpoint}/recipes`).
      then(async (response: Response): Promise<Recipe[]> => response.json());
  }
});

export {
  createFetchRecipeApi
};
