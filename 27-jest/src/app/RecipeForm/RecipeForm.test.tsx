import { createIngredient } from '../../../fixtures/createIngredient';
import { createRecipe } from '../../../fixtures/createRecipe';
import { noop } from '../../../fixtures/noop';
import { Recipe } from '../../types/Recipe';
import { RecipeForm } from '.';
import userEvent from '@testing-library/user-event';
import { render, screen, within } from '@testing-library/react';

describe('RecipeForm', (): void => {
  it('when given no recipe, presents empty form.', async (): Promise<void> => {
    render(<RecipeForm onSave={ noop } />);

    const nameInput = screen.getByLabelText('Name des Rezepts:') as HTMLInputElement;

    expect(nameInput).not.toBeNull();
    expect(nameInput.value).toEqual('');
  });

  it('when given no recipe, creates one empty ingredient form part.', async (): Promise<void> => {
    render(<RecipeForm onSave={ noop } />);

    const firstIngredientInputs = screen.getByLabelText('Zutat 1');

    const ingredienNameInput = within(firstIngredientInputs).getByLabelText('Zutat:') as HTMLInputElement;
    const ingredientAmountInput = within(firstIngredientInputs).getByLabelText('Menge:') as HTMLInputElement;
    const ingredientUnitInput = within(firstIngredientInputs).getByLabelText('Mengeneinheit') as HTMLInputElement;

    expect(ingredienNameInput.value).toEqual('');
    expect(ingredientAmountInput.value).toEqual('0');
    expect(ingredientUnitInput.value).toEqual('Stück');
  });

  it('adds a new ingredient form part on button click.', async (): Promise<void> => {
    render(<RecipeForm onSave={ noop } />);

    expect(screen.queryByLabelText('Zutat 2')).toBeNull();

    const addIngredientButton = screen.getByLabelText('Zutat hinzufügen');

    userEvent.click(addIngredientButton);

    expect(screen.getByLabelText('Zutat 2')).not.toBeNull();
  });

  it('on save returns the entire filled recipe.', async (): Promise<void> => {
    const onSaveSpy = jest.fn();

    render(<RecipeForm onSave={ onSaveSpy } />);

    userEvent.type(screen.getByLabelText('Name des Rezepts:'), 'New RecipeName');
    userEvent.type(screen.getByLabelText('Zutat:'), 'First Ingredient');
    userEvent.type(screen.getByLabelText('Menge:'), '200');
    userEvent.selectOptions(screen.getByLabelText('Mengeneinheit'), 'Gramm');
    userEvent.click(screen.getByLabelText('New RecipeName speichern'));

    const expectedRecipe: Recipe = createRecipe({
      id: null,
      ingredients: [
        createIngredient({
          amount: 200,
          name: 'First Ingredient',
          unit: 'Gramm'
        })
      ],
      name: 'New RecipeName',
      showEditForm: false
    });

    expect(onSaveSpy).toHaveBeenCalledTimes(1);
    expect(onSaveSpy).toHaveBeenCalledWith(expectedRecipe);
  });

  it('when given an existing recipe, sets the values of the recipe..', async (): Promise<void> => {
    const existingRecipe = createRecipe({
      ingredients: [ createIngredient({ name: 'Test Ingredient' }) ],
      name: 'Test Recipe'
    });

    render(<RecipeForm onSave={ noop } recipe={ existingRecipe } />);

    expect(screen.getByDisplayValue('Test Recipe')).not.toBeNull();
    expect(screen.getByDisplayValue('Test Ingredient')).not.toBeNull();
  });
});
