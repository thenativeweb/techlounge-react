import { IngredientFormPart } from './IngredientFormPart';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { RecipeType } from '../../types/RecipeTypes';
import './RecipeForm.css';

const createEmptyIngredient = () => ({
  name: '',
  amount: 0,
  unit: 'Stück'
});

const emptyState = {
  id: null,
  name: '',
  ingredients: [ createEmptyIngredient() ]
};

const RecipeForm = ({ recipe = emptyState, onSave }) => {
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
      ingredients
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

RecipeForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  recipe: RecipeType
};

export { RecipeForm };
