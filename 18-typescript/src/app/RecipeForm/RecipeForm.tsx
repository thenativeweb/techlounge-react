import { FunctionComponent, ReactElement, useState } from 'react';
import { Ingredient } from '../../types/Ingredient';
import { Recipe } from '../../types/Recipe';
import { IngredientFormPart } from './IngredientFormPart';
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
  onSave: (recipe: Recipe) => void;
}

const RecipeForm: FunctionComponent<RecipeFormProps> = ({ recipe = emptyState, onSave }): ReactElement => {
  const [ recipeName, setRecipeName ] = useState<string>(recipe.name);
  const [ ingredients, setIngredients ] = useState<Ingredient[]>(recipe.ingredients);

  const handleAddIngredient = (): void => {
    setIngredients(currentIngridients => [
      ...currentIngridients,
      createEmptyIngredient()
    ]);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => setRecipeName(event.target.value);

  const handleIngredientChange = (event, ingredientName: string) => {
    setIngredients(currentIngridients =>
      currentIngridients.map(ingredient => {
        const { value, name } = event.target;

        if (ingredient.name === ingredientName) {
          return {
            ...ingredient,
            [name]: name === 'amount' ? Number.parseFloat(value) : value
          };
        }

        return ingredient;
      }));
  };

  const handleRecipeSave = () => {
    onSave({
      id: recipe.id,
      name: recipeName,
      ingredients,
      showEditForm: false
    });

    setRecipeName('');
    setIngredients([]);
  };
  const ingredientList = ingredients.map((ingredient, index) => (
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
          <button type='button' onClick={ () => handleAddIngredient() }>Zutat hinzufügen</button>
        </article>
        <button type='button' onClick={ () => handleRecipeSave() }>Speichern</button>
      </form>
    </article>
  );
};

export { RecipeForm };
