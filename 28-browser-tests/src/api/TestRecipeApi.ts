import { createRecipe } from '../../fixtures/createRecipe';
import { Recipe } from '../types/Recipe';
import { RecipeApi } from './RecipeApi';

const defaultTestRecipeApi: RecipeApi = {
  async fetchAllRecipes (): Promise<Recipe[]> {
    return Promise.resolve([ createRecipe() ]);
  }
};

const createTestRecipeApi = (overwrites: Partial<RecipeApi>): RecipeApi => ({
  ...defaultTestRecipeApi,
  ...overwrites
});

export {
  createTestRecipeApi
};
