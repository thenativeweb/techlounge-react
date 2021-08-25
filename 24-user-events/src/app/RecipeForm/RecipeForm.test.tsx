import { assert } from 'assertthat';
import { noop } from '../../../fixtures/noop';
import { Recipe } from '../../types/Recipe';
import { RecipeForm } from '.';
import sinon from 'sinon';
import userEvent from '@testing-library/user-event';
import { render, screen, within } from '@testing-library/react';

describe('RecipeForm', (): void => {
  it('when given no recipe, presents empty form.', async (): Promise<void> => {
    render(<RecipeForm onSave={ noop } />);

    const nameInput = screen.getByLabelText('Name des Rezepts:') as HTMLInputElement;

    assert.that(nameInput).is.not.null();
    assert.that(nameInput.value).is.equalTo('');
  });

  it('when given no recipe, creates one empty ingredient sub form.', async (): Promise<void> => {
    render(<RecipeForm onSave={ noop } />);

    const firstIngredientInputs = screen.getByLabelText('Zutat 1');

    const ingredienNameInput = within(firstIngredientInputs).getByLabelText('Zutat:') as HTMLInputElement;
    const ingredientAmountInput = within(firstIngredientInputs).getByLabelText('Menge:') as HTMLInputElement;
    const ingredientUnitInput = within(firstIngredientInputs).getByLabelText('Mengeneinheit') as HTMLInputElement;

    assert.that(ingredienNameInput.value).is.equalTo('');
    assert.that(ingredientAmountInput.value).is.equalTo('0');
    assert.that(ingredientUnitInput.value).is.equalTo('Stück');
  });

  it('adds a new ingredient form part on button click.', async (): Promise<void> => {
    render(<RecipeForm onSave={ noop } />);

    assert.that(screen.queryByLabelText('Zutat 2')).is.null();

    const addIngredientButton = screen.getByLabelText('Zutat hinzufügen');

    userEvent.click(addIngredientButton);

    assert.that(screen.getByLabelText('Zutat 2')).is.not.null();
  });

  it('on save returns the entire filled recipe.', async (): Promise<void> => {
    const onSaveSpy = sinon.spy();

    render(<RecipeForm onSave={ onSaveSpy } />);

    userEvent.type(screen.getByLabelText('Name des Rezepts:'), 'New RecipeName');
    userEvent.type(screen.getByLabelText('Zutat:'), 'First Ingredient');
    userEvent.type(screen.getByLabelText('Menge:'), '200');
    userEvent.selectOptions(screen.getByLabelText('Mengeneinheit'), 'Gramm');
    userEvent.click(screen.getByLabelText('New RecipeName speichern'));

    const expectedRecipe: Recipe = {
      id: null,
      ingredients: [{
        amount: 200,
        name: 'First Ingredient',
        unit: 'Gramm'
      }],
      name: 'New RecipeName',
      showEditForm: false
    };

    assert.that(onSaveSpy.calledOnce).is.true();
    assert.that(onSaveSpy.firstCall.firstArg).is.equalTo(expectedRecipe);
  });
});
