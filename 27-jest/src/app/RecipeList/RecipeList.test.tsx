import { createIngredient } from '../../../fixtures/createIngredient';
import { createRecipe } from '../../../fixtures/createRecipe';
import { noop } from '../../../fixtures/noop';
import { RecipeList } from './RecipeList';
import userEvent from '@testing-library/user-event';
import { render, screen, within } from '@testing-library/react';

describe('RecipeList', (): void => {
  it('renders an empty list if no inputs given.', async (): Promise<void> => {
    render(
      <RecipeList
        recipes={ [] }
        onSaveChanges={ noop }
        onToggleEdit={ noop }
      />
    );

    expect(screen.getByLabelText('Rezepte')).not.toBeNull();
    expect(screen.getByLabelText('Rezepte').children.length).toEqual(0);
  });

  it('renders the name of all given recipes in a list.', async (): Promise<void> => {
    const recipe1 = createRecipe({ id: 1, name: 'Recipe 1' });
    const recipe2 = createRecipe({ id: 2, name: 'Recipe 2' });

    render(
      <RecipeList
        recipes={ [ recipe1, recipe2 ] }
        onSaveChanges={ noop }
        onToggleEdit={ noop }
      />
    );

    const recipeList = screen.getByLabelText('Rezepte');

    expect(within(recipeList).getByText('Recipe 1', { exact: false })).not.toBeNull();
    expect(within(recipeList).getByText('Recipe 2', { exact: false })).not.toBeNull();
  });

  it('renders the ingredients within a given recipe.', async (): Promise<void> => {
    const ingredient = createIngredient({ amount: 2, name: 'Ingredient', unit: 'Gramm' });
    const recipe = createRecipe({ name: 'Recipe', ingredients: [ ingredient ]});

    render(
      <RecipeList
        recipes={ [ recipe ] }
        onSaveChanges={ noop }
        onToggleEdit={ noop }
      />
    );

    const recipeList = screen.getByLabelText('Rezepte');
    const ingredientList = within(recipeList).getByLabelText('Zutaten');

    expect(ingredientList).not.toBeNull();
    expect(within(ingredientList).getByText('2 Gramm Ingredient')).not.toBeNull();
  });

  it('renders the recipes as a form when showEditForm is set to true.', async (): Promise<void> => {
    const ingredient = createIngredient({ amount: 2, name: 'Ingredient', unit: 'Gramm' });
    const recipe = createRecipe({ name: 'TestRecipe', showEditForm: true, ingredients: [ ingredient ]});

    render(
      <RecipeList
        recipes={ [ recipe ] }
        onSaveChanges={ noop }
        onToggleEdit={ noop }
      />
    );

    expect(screen.getByLabelText('Name des Rezepts:')).not.toBeNull();
    expect(screen.getByDisplayValue('TestRecipe')).not.toBeNull();
  });

  it('calls the onToggleEdit callback on click with the clicked recipe.', async (): Promise<void> => {
    const recipe = createRecipe({ name: 'TestRecipe', showEditForm: false, ingredients: [ createIngredient() ]});
    const toggleEditSpy = jest.fn();

    render(
      <RecipeList
        recipes={ [ recipe ] }
        onSaveChanges={ noop }
        onToggleEdit={ toggleEditSpy }
      />
    );

    const editButton = screen.getByLabelText('TestRecipe bearbeiten');

    userEvent.click(editButton);

    expect(toggleEditSpy).toHaveBeenCalledTimes(1);
    expect(toggleEditSpy).toHaveBeenCalledWith(recipe);
  });

  it('calls the onSaveChanges handler with the recipe when clicking the save button within the recipeForm..', async (): Promise<void> => {
    const recipe = createRecipe({ id: 1, name: 'TestRecipe', showEditForm: true, ingredients: [ createIngredient() ]});
    const onSaveChangesSpy = jest.fn();

    render(
      <RecipeList
        recipes={ [ recipe ] }
        onSaveChanges={ onSaveChangesSpy }
        onToggleEdit={ noop }
      />
    );

    const saveButton = screen.getByLabelText('TestRecipe speichern');

    userEvent.click(saveButton);

    expect(onSaveChangesSpy).toHaveBeenCalledTimes(1);
    expect(onSaveChangesSpy).toHaveBeenCalledWith(recipe);
  });
});
