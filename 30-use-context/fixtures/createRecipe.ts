import { Recipe } from '../src/types/Recipe';

const defaultRecipe: Recipe = {
  id: 1,
  ingredients: [],
  name: 'testRecipe',
  showEditForm: false
};

const createRecipe = (props: Partial<Recipe> = {}): Recipe => ({ ...defaultRecipe, ...props });

export {
  createRecipe
};
