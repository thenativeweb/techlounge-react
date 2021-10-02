import { App } from './App';
import { createIngredient } from '../../fixtures/createIngredient';
import { createRecipe } from '../../fixtures/createRecipe';
import { createTestRecipeApi } from '../api/TestRecipeApi';
import { noop } from '../../fixtures/noop';
import { Recipe } from '../types/Recipe';
import { RecipeApi } from '../api/RecipeApi';
import { render, screen } from '@testing-library/react';

describe('App', (): void => {
  it('shows the ingredients returned from the recipeApi.', async (): Promise<void> => {
    const expectedIngredient = createIngredient({
      name: 'Test Ingredient'
    });

    const mockRecipeApi: RecipeApi = createTestRecipeApi({
      fetchAllRecipes: async (): Promise<Recipe[]> => Promise.resolve([
        createRecipe({ ingredients: [ expectedIngredient ]})
      ])
    });

    render(<App recipeApi={ mockRecipeApi } />);

    expect(await screen.findByText('Test Ingredient', { exact: false })).not.toBeNull();
  });

  it('displays loading indicator until recipes where loaded.', async (): Promise<void> => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    let triggerResolve: (recipes: Recipe[]) => void = (): void => {
      throw new Error('Was triggered before being reassigned.');
    };
    const promise: Promise<Recipe[]> = new Promise((resolve): void => {
      triggerResolve = resolve;
    });
    const mockRecipeApi: RecipeApi = createTestRecipeApi({ fetchAllRecipes: async (): Promise<Recipe[]> => promise });

    render(<App recipeApi={ mockRecipeApi } />);

    expect(screen.getByText('Lade Rezepte...')).not.toBeNull();

    triggerResolve([ createRecipe() ]);

    expect(await screen.findAllByText('Einkaufsliste')).not.toHaveLength(0);
  });

  it('displays an error message if recipeApi rejects.', async (): Promise<void> => {
    // Avoid console error output here
    jest.spyOn(console, 'error').mockImplementation(noop);
    const mockRecipeApi: RecipeApi = createTestRecipeApi({
      fetchAllRecipes: async (): Promise<Recipe[]> => Promise.reject(new Error('Unexpected Error.'))
    });

    render(<App recipeApi={ mockRecipeApi } />);

    expect(await screen.findByText('Fehler beim Laden der Rezepte.', { exact: false })).not.toBeNull();
    jest.restoreAllMocks();
  });
});
