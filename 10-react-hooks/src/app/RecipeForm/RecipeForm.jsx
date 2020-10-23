import React, { useState } from 'react';
import { IngredientFormPart } from './IngredientFormPart';
import './RecipeForm.css';

const createEmptyIngredient = () => ({
  name: '',
  amount: '',
  unit: 'Stück'
});

const emptyState = {
  id: null,
  name: '',
  ingredients: [ createEmptyIngredient() ]
};

export const RecipeForm = ({ recipe = emptyState, onSave }) => {
  const [ recipeName, setRecipeName ] = useState(recipe.name);
  const [ ingredients, setIngredients ] = useState(recipe.ingredients);

  const handleAddIngredient = () => {
    setIngredients(currentIngridients => [
      ...currentIngridients,
      createEmptyIngredient()
    ]);
  };

  const handleNameChange = event => setRecipeName(event.target.value);

  const handleIngredientChange = (event, ingredientName) => {
    const { value, name } = event.target;

    setIngredients(currentIngridients =>
      currentIngridients.map(ingredient => {
        if (ingredient.name === ingredientName) {
          return {
            ...ingredient,
            [name]: value
          };
        }

        return ingredient;
      }));
  };

  const handleRecipeSave = () => {
    const finishedIngredients = ingredients.map(ingredient => ({
      ...ingredient,
      amount: Number.parseFloat(ingredient.amount)
    }));

    onSave({
      id: recipe.id,
      name: recipeName,
      ingredients: finishedIngredients
    });

    setRecipeName('');
    setIngredients([]);
  };
  const ingredientList = ingredients.map((ingredient, index) => (
    <IngredientFormPart
      key={ `ingredient-${index}` }
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
