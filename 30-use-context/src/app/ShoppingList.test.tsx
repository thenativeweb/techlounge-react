import { assert } from 'assertthat';
import { createIngredient } from '../../fixtures/createIngredient';
import { createRecipe } from '../../fixtures/createRecipe';
import { createTestRecipeApi } from '../api/TestRecipeApi';
import { FetchApiContext } from '../api/ApiContext';
import { Recipe } from '../types/Recipe';
import { RecipeApi } from '../api/RecipeApi';
import { ShoppingList } from './ShoppingList';
import { render, screen } from '@testing-library/react';
import * as sinon from 'sinon';

describe('ShoppingList', (): void => {
  it('shows the ingredients returned from the recipeApi.', async (): Promise<void> => {
    const expectedIngredient = createIngredient({
      name: 'Test Ingredient'
    });

    const mockRecipeApi: RecipeApi = createTestRecipeApi({
      fetchAllRecipes: async (): Promise<Recipe[]> => Promise.resolve([
        createRecipe({ ingredients: [ expectedIngredient ]})
      ])
    });

    render(
      <FetchApiContext.Provider value={mockRecipeApi}>
        <ShoppingList />
      </FetchApiContext.Provider>
    );

    assert.that(await screen.findByText('Test Ingredient', { exact: false })).is.not.null();
  });

  it('displays loading indicator until recipes where loaded.', async (): Promise<void> => {
    // @ts-expect-error The sinon.promise() API is pretty new and the @types/sinon package was not updated yet.
    const pendingPromise = sinon.promise();
    const mockRecipeApi: RecipeApi = createTestRecipeApi({
      fetchAllRecipes: async (): Promise<Recipe[]> => pendingPromise
    });

    render(
      <FetchApiContext.Provider value={mockRecipeApi}>
        <ShoppingList />
      </FetchApiContext.Provider>
    );

    assert.that(screen.getByText('Lade Rezepte...')).is.not.null();

    pendingPromise.resolve([ createRecipe() ]);

    assert.that(await screen.findAllByText('Einkaufsliste')).is.not.empty();
  });

  it('displays an error message if recipeApi rejects.', async (): Promise<void> => {
    // Avoid console error output here
    sinon.stub(console, 'error');
    const mockRecipeApi: RecipeApi = createTestRecipeApi({
      fetchAllRecipes: async (): Promise<Recipe[]> => Promise.reject(new Error('Unexpected Error.'))
    });

    render(
      <FetchApiContext.Provider value={mockRecipeApi}>
        <ShoppingList />
      </FetchApiContext.Provider>
    );

    assert.that(await screen.findByText('Fehler beim Laden der Rezepte.', { exact: false })).is.not.null();
    sinon.restore();
  });
});
