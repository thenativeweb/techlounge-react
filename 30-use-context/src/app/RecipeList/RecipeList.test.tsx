import { assert } from 'assertthat';
import { createIngredient } from '../../../fixtures/createIngredient';
import { createRecipe } from '../../../fixtures/createRecipe';
import { noop } from '../../../fixtures/noop';
import { RecipeList } from './RecipeList';
import userEvent from '@testing-library/user-event';
import { render, screen, within } from '@testing-library/react';
import * as sinon from 'sinon';

describe('RecipeList', (): void => {
  it('renders an empty list if no inputs given.', async (): Promise<void> => {
    render(
      <RecipeList
        recipes={ [] }
        onSaveChanges={ noop }
      />
    );

    assert.that(screen.getByLabelText('Rezepte')).is.not.null();
    assert.that(screen.getByLabelText('Rezepte').children.length).is.equalTo(0);
  });

  it('renders the name of all given recipes in a list.', async (): Promise<void> => {
    const recipe1 = createRecipe({ id: 1, name: 'Recipe 1' });
    const recipe2 = createRecipe({ id: 2, name: 'Recipe 2' });

    render(
      <RecipeList
        recipes={ [ recipe1, recipe2 ] }
        onSaveChanges={ noop }
      />
    );

    const recipeList = screen.getByLabelText('Rezepte');

    assert.that(within(recipeList).getByText('Recipe 1', { exact: false })).is.not.null();
    assert.that(within(recipeList).getByText('Recipe 2', { exact: false })).is.not.null();
  });

  it('renders the ingredients within a given recipe.', async (): Promise<void> => {
    const ingredient = createIngredient({ amount: 2, name: 'Ingredient', unit: 'Gramm' });
    const recipe = createRecipe({ name: 'Recipe', ingredients: [ ingredient ]});

    render(
      <RecipeList
        recipes={ [ recipe ] }
        onSaveChanges={ noop }
      />
    );

    const recipeList = screen.getByLabelText('Rezepte');
    const ingredientList = within(recipeList).getByLabelText('Zutaten');

    assert.that(ingredientList).is.not.null();
    assert.that(within(ingredientList).getByText('2 Gramm Ingredient')).is.not.null();
  });

  it('renders the recipes as a form on click of edit button.', async (): Promise<void> => {
    const ingredient = createIngredient({ amount: 2, name: 'Ingredient', unit: 'Gramm' });
    const recipe = createRecipe({ name: 'TestRecipe', ingredients: [ ingredient ]});

    render(
      <RecipeList
        recipes={ [ recipe ] }
        onSaveChanges={ noop }
      />
    );

    const editButton = screen.getByLabelText('TestRecipe bearbeiten');

    userEvent.click(editButton);

    assert.that(screen.getByLabelText('Name des Rezepts:')).is.not.null();
    assert.that(screen.getByDisplayValue('TestRecipe')).is.not.null();
  });

  it('calls the onSaveChanges handler with the recipe when clicking the save button within the recipeForm.', async (): Promise<void> => {
    const recipe = createRecipe({ id: 1, name: 'TestRecipe', ingredients: [ createIngredient() ]});
    const onSaveChangesSpy = sinon.spy();

    render(
      <RecipeList
        recipes={ [ recipe ] }
        onSaveChanges={ onSaveChangesSpy }
      />
    );

    const editButton = screen.getByLabelText('TestRecipe bearbeiten');

    userEvent.click(editButton);

    const saveButton = screen.getByLabelText('TestRecipe speichern');

    userEvent.click(saveButton);

    assert.that(onSaveChangesSpy.calledOnce).is.true();
    assert.that(onSaveChangesSpy.firstCall.firstArg).is.equalTo(recipe);
  });

  it('closes the form after saving the recipe in the edit form.', async (): Promise<void> => {
    const recipe = createRecipe({ id: 1, name: 'TestRecipe', ingredients: [ createIngredient() ]});

    render(
      <RecipeList
        recipes={ [ recipe ] }
        onSaveChanges={ noop }
      />
    );

    const editButton = screen.getByLabelText('TestRecipe bearbeiten');

    userEvent.click(editButton);

    const saveButton = screen.getByLabelText('TestRecipe speichern');

    userEvent.click(saveButton);

    assert.that(screen.queryByLabelText('Name des Rezepts:')).is.null();
  });
});
