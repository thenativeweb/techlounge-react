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

  const handleIngredientChange: RecipeFormChangeEvent = (event, ingredientName): void => {
    setIngredients((currentIngridients): Ingredient[] =>
      currentIngridients.map((ingredient): Ingredient => {
        const { value, name } = event.target;

        if (ingredient.name === ingredientName) {
          const result = {
            ...ingredient,
            [name]: name === 'amount' ? Number.parseFloat(value) : value
          };

          return result;
        }

        return ingredient;
      }));
  };

  const handleRecipeSave = (): void => {
    onSave({
      id: recipe.id,
      name: recipeName,
      ingredients,
      showEditForm: false
    });

    setRecipeName('');
    setIngredients([ createEmptyIngredient() ]);
  };

  const ingredientList = ingredients.map((ingredient, index): ReactElement => (
    <IngredientFormPart
      key={`ingredient-${index}`}
      ingredient={ ingredient }
      onChange={ handleIngredientChange }
    />
  ));

  return (
    <article>
      <form>
        <label>
          Name des Rezepts:
          <input
            type='text'
            value={ recipeName }
            onChange={ handleNameChange }
          />
        </label>
        <label>Zutaten</label>
        <article>
          {ingredientList}
          <button type='button' onClick={ (): void => handleAddIngredient() }>Zutat hinzufügen</button>
        </article>
        <button type='button' onClick={ (): void => handleRecipeSave() }>Speichern</button>
      </form>
    </article>
  );
};

export { RecipeForm };
