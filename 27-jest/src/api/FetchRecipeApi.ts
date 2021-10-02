import { Recipe } from '../types/Recipe';
import { RecipeApi } from './RecipeApi';

const createFetchRecipeApi = (): RecipeApi => ({
  async fetchAllRecipes (): Promise<Recipe[]> {
    return await fetch('http://localhost:3000/recipes').
      then(async (response: Response): Promise<Recipe[]> => response.json());
  }
});

export {
  createFetchRecipeApi
};
