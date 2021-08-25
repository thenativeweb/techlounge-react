import { Ingredient } from '../../types/Ingredient';
import { IngredientFormPart } from './IngredientFormPart';
import { Recipe } from '../../types/Recipe';
import { RecipeChangeHandler } from './types/RecipeChangeHandler';
import { RecipeFormChangeEvent } from './types/RecipeFormChangeEvent';
import { ChangeEvent, FunctionComponent, ReactElement, useState } from 'react';
import './RecipeForm.css';

const createEmptyIngredient = (): Ingredient => ({
  name: '',
  amount: 0,
  unit: 'Stück'
});

const emptyState: Recipe = {
  id: null,
  name: '',
  ingredients: [ createEmptyIngredient() ],
  showEditForm: false
};

interface RecipeFormProps {
  recipe?: Recipe;
  onSave: RecipeChangeHandler;
}

const RecipeForm: FunctionComponent<RecipeFormProps> = ({ recipe = emptyState, onSave }): ReactElement => {
  const [ recipeName, setRecipeName ] = useState<string>(recipe.name);
  const [ ingredients, setIngredients ] = useState<Ingredient[]>(recipe.ingredients);

  const handleAddIngredient = (): void => {
    setIngredients((currentIngridients): Ingredient[] => [
      ...currentIngridients,
      createEmptyIngredient()
    ]);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>): void => setRecipeName(event.target.value);

  const handleIngredientChange = (changedIngredient: Ingredient, ingredientName: string, ingredientNumber: number): void => {
    setIngredients((currentIngridients): Ingredient[] =>
      currentIngridients.map((ingredient, index): Ingredient => {
        if (index === ingredientNumber - 1) {
          return changedIngredient;
        }

        return ingredient;
      }));
  };

  const handleRecipeSave = (): void => {
    onSave({
      id: recipe.id,
      name: recipeName,
      ingredients,
      showEditForm: recipe.showEditForm
    });

    setRecipeName('');
    setIngredients([ createEmptyIngredient() ]);
  };

  const ingredientList = ingredients.map((ingredient, index): ReactElement => (
    <IngredientFormPart
      // eslint-disable-next-line react/no-array-index-key
      key={ `ingredient-${index}` }
      ingredientNumber={ index + 1 }
      ingredient={ ingredient }
      onChange={ handleIngredientChange }
    />
  ));

  return (
    <article>
      <form role='form' aria-label='Rezept bearbeiten'>
        <label>
          Name des Rezepts:
          {' '}
          <input
            type='text'
            value={ recipeName }
            onChange={ handleNameChange }
          />
        </label>
        <label>Zutaten</label>
        <article>
          {ingredientList}
          <button type='button' onClick={ (): void => handleAddIngredient() } aria-label='Zutat hinzufügen'>Zutat hinzufügen</button>
        </article>
        <button type='button' onClick={ (): void => handleRecipeSave() } aria-label={ `${recipeName} speichern` }>Speichern</button>
      </form>
    </article>
  );
};

export { RecipeForm };
