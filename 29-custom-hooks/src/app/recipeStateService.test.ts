import { assert } from 'assertthat';
import { createIngredient } from '../../fixtures/createIngredient';
import { createRecipe } from '../../fixtures/createRecipe';
import { Recipe } from '../types/Recipe';
import { addRecipeToList, sumRecipeIngredients, toggleEditFormInList, updateRecipeInList } from './recipeStateService';

describe('recipeStateService', (): void => {
  describe('addRecipe()', (): void => {
    it('adds the recipe to the given RecipeList.', async (): Promise<void> => {
      const firstRecipe: Recipe = createRecipe({ id: 1 });
      const secondRecipe: Recipe = createRecipe({ id: 2 });

      const result = addRecipeToList([ firstRecipe ], secondRecipe);

      assert.that(result).is.equalTo([ firstRecipe, secondRecipe ]);
    });
  });

  describe('sumRecipeIngredients()', (): void => {
    it('returns an empty array for recipes with only empty ingredients.', async (): Promise<void> => {
      const emptyRecipe = createRecipe({ ingredients: []});

      const result = sumRecipeIngredients([ emptyRecipe ]);

      assert.that(result).is.empty();
    });

    it('returns a single ingredient for a recipe with only one ingredient.', async (): Promise<void> => {
      const ingredient = createIngredient({ amount: 100, unit: 'Gramm' });
      const recipe = createRecipe({ ingredients: [ ingredient ]});

      const result = sumRecipeIngredients([ recipe ]);

      assert.that(result).is.containing(ingredient);
    });

    it('sums up the amount of all ingredients with the same name.', async (): Promise<void> => {
      const ingredient = createIngredient({ name: 'Zucker', amount: 100, unit: 'Gramm' });
      const firstRecipe = createRecipe({ id: 1, ingredients: [ ingredient ]});
      const secondRecipe = createRecipe({ id: 2, ingredients: [ ingredient ]});

      const result = sumRecipeIngredients([ firstRecipe, secondRecipe ]);

      assert.that(result).is.containing({ name: 'Zucker', amount: 200, unit: 'Gramm' });
    });

    it('only sums up the same ingredients of differnet recipes.', async (): Promise<void> => {
      const sameIngredient1 = createIngredient({ name: 'Zucker', amount: 100, unit: 'Gramm' });
      const sameIngredient2 = createIngredient({ name: 'Zucker', amount: 200, unit: 'Gramm' });
      const otherIngredient = createIngredient({ name: 'Eier', amount: 1, unit: 'Stück' });

      const firstRecipe = createRecipe({ id: 1, ingredients: [ sameIngredient1, otherIngredient ]});
      const secondRecipe = createRecipe({ id: 2, ingredients: [ sameIngredient2 ]});

      const result = sumRecipeIngredients([ firstRecipe, secondRecipe ]);

      assert.that(result).is.equalTo([
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

      const resultRecipes = updateRecipeInList([ oldRecipe, otherRecipe ], updatedRecipe);

      assert.that(resultRecipes).is.not.containing(oldRecipe);
      assert.that(resultRecipes).is.equalTo([ updatedRecipe, otherRecipe ]);
    });

    it('always sets "showEditForm" to false.', async (): Promise<void> => {
      const oldRecipe = createRecipe({ id: 1, name: 'OldName', showEditForm: true });
      const updatedRecipe = createRecipe({ id: 1, name: 'NewRecipe', showEditForm: true });

      const resultRecipes = updateRecipeInList([ oldRecipe ], updatedRecipe);

      assert.that(resultRecipes[0].showEditForm).is.false();
    });
  });

  describe('toggleEditForm()', (): void => {
    it('sets showEditForm to true if false.', async (): Promise<void> => {
      const recipe = createRecipe({ showEditForm: false });

      const result = toggleEditFormInList([ recipe ], recipe);

      assert.that(result[0].showEditForm).is.true();
    });

    it('sets showEditForm to false if true.', async (): Promise<void> => {
      const recipe = createRecipe({ showEditForm: true });

      const result = toggleEditFormInList([ recipe ], recipe);

      assert.that(result[0].showEditForm).is.false();
    });

    it('leaves other recipes untouched.', async (): Promise<void> => {
      const toggleRecipe = createRecipe({ id: 1, showEditForm: false });
      const otherRecipe = createRecipe({ id: 2, showEditForm: false });

      const result = toggleEditFormInList([ toggleRecipe, otherRecipe ], toggleRecipe);

      assert.that(result).is.equalTo([
        { ...toggleRecipe, showEditForm: true },
        otherRecipe
      ]);
    });
  });
});
