import { createIngredient } from '../../fixtures/createIngredient';
import { createRecipe } from '../../fixtures/createRecipe';
import { Recipe } from '../types/Recipe';
import { addRecipe, sumRecipeIngredients, toggleEditForm, updateRecipe } from './recipeStateService';

describe('recipeStateService', (): void => {
  describe('addRecipe()', (): void => {
    it('adds the recipe to the given RecipeList.', async (): Promise<void> => {
      const firstRecipe: Recipe = createRecipe({ id: 1 });
      const secondRecipe: Recipe = createRecipe({ id: 2 });

      const result = addRecipe([ firstRecipe ], secondRecipe);

      expect(result).toEqual([ firstRecipe, secondRecipe ]);
    });
  });

  describe('sumRecipeIngredients()', (): void => {
    it('returns an empty array for recipes with only empty ingredients.', async (): Promise<void> => {
      const emptyRecipe = createRecipe({ ingredients: []});

      const result = sumRecipeIngredients([ emptyRecipe ]);

      expect(result).toHaveLength(0);
    });

    it('returns a single ingredient for a recipe with only one ingredient.', async (): Promise<void> => {
      const ingredient = createIngredient({ amount: 100, unit: 'Gramm' });
      const recipe = createRecipe({ ingredients: [ ingredient ]});

      const result = sumRecipeIngredients([ recipe ]);

      expect(result).toContainEqual(ingredient);
    });

    it('sums up the amount of all ingredients with the same name.', async (): Promise<void> => {
      const ingredient = createIngredient({ name: 'Zucker', amount: 100, unit: 'Gramm' });
      const firstRecipe = createRecipe({ id: 1, ingredients: [ ingredient ]});
      const secondRecipe = createRecipe({ id: 2, ingredients: [ ingredient ]});

      const result = sumRecipeIngredients([ firstRecipe, secondRecipe ]);

      expect(result).toContainEqual({ name: 'Zucker', amount: 200, unit: 'Gramm' });
    });

    it('only sums up the same ingredients of differnet recipes.', async (): Promise<void> => {
      const sameIngredient1 = createIngredient({ name: 'Zucker', amount: 100, unit: 'Gramm' });
      const sameIngredient2 = createIngredient({ name: 'Zucker', amount: 200, unit: 'Gramm' });
      const otherIngredient = createIngredient({ name: 'Eier', amount: 1, unit: 'Stück' });

      const firstRecipe = createRecipe({ id: 1, ingredients: [ sameIngredient1, otherIngredient ]});
      const secondRecipe = createRecipe({ id: 2, ingredients: [ sameIngredient2 ]});

      const result = sumRecipeIngredients([ firstRecipe, secondRecipe ]);

      expect(result).toEqual([
        { name: 'Zucker', amount: 300, unit: 'Gramm' },
        { name: 'Eier', amount: 1, unit: 'Stück' }
      ]);
    });
  });

  describe('updateRecipe()', (): void => {
    it('updates the recipe in the list with the same id.', async (): Promise<void> => {
      const oldRecipe = createRecipe({ id: 1, name: 'OldName', ingredients: []});
      const updatedRecipe = createRecipe({ id: 1, name: 'New Recipe', ingredients: [ createIngredient() ]});
      const otherRecipe = createRecipe({ id: 2, name: 'OtherRecipe' });

      const resultRecipes = updateRecipe([ oldRecipe, otherRecipe ], updatedRecipe);

      expect(resultRecipes).not.toContain(oldRecipe);
      expect(resultRecipes).toEqual([ updatedRecipe, otherRecipe ]);
    });

    it('always sets "showEditForm" to false.', async (): Promise<void> => {
      const oldRecipe = createRecipe({ id: 1, name: 'OldName', showEditForm: true });
      const updatedRecipe = createRecipe({ id: 1, name: 'NewRecipe', showEditForm: true });

      const resultRecipes = updateRecipe([ oldRecipe ], updatedRecipe);

      expect(resultRecipes[0].showEditForm).toBe(false);
    });
  });

  describe('toggleEditForm()', (): void => {
    it('sets showEditForm to true if false.', async (): Promise<void> => {
      const recipe = createRecipe({ showEditForm: false });

      const result = toggleEditForm([ recipe ], recipe);

      expect(result[0].showEditForm).toBe(true);
    });

    it('sets showEditForm to false if true.', async (): Promise<void> => {
      const recipe = createRecipe({ showEditForm: true });

      const result = toggleEditForm([ recipe ], recipe);

      expect(result[0].showEditForm).toBe(false);
    });

    it('leaves other recipes untouched.', async (): Promise<void> => {
      const toggleRecipe = createRecipe({ id: 1, showEditForm: false });
      const otherRecipe = createRecipe({ id: 2, showEditForm: false });

      const result = toggleEditForm([ toggleRecipe, otherRecipe ], toggleRecipe);

      expect(result).toEqual([
        { ...toggleRecipe, showEditForm: true },
        otherRecipe
      ]);
    });
  });
});
