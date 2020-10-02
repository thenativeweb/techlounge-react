import React from 'react';
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

export class RecipeForm extends React.Component {
  constructor (props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleIngredientChange = this.handleIngredientChange.bind(this);
    this.handleRecipeSave = this.handleRecipeSave.bind(this);

    if (this.props.recipe) {
      this.state = {
        id: this.props.recipe.id,
        name: this.props.recipe.name,
        ingredients: this.props.recipe.ingredients
      };
    } else {
      this.state = emptyState;
    }
  }

  handleAddIngredient () {
    this.setState(currentState => (
      {
        ...currentState,
        ingredients: [
          ...currentState.ingredients,
          createEmptyIngredient()
        ]
      }
    ));
  }

  handleIngredientChange (event, ingredientName) {
    const { value, name } = event.target;

    this.setState(currentState => ({
      ...currentState,
      ingredients: currentState.ingredients.map(ingredient => {
        if (ingredient.name === ingredientName) {
          return {
            ...ingredient,
            [name]: value
          };
        }

        return ingredient;
      })
    }));
  }

  handleNameChange (event) {
    this.setState({
      name: event.target.value
    });
  }

  handleRecipeSave () {
    const finishedIngredients = this.state.ingredients.map(ingredient => ({
      ...ingredient,
      amount: Number.parseFloat(ingredient.amount)
    }));

    this.props.onSave({
      id: this.state.id,
      name: this.state.name,
      ingredients: finishedIngredients
    });

    this.setState(emptyState);
  }

  render () {
    const ingredientList = this.state.ingredients.map((ingredient, index) => (
      <IngredientFormPart
        key={ `ingredient-${index}` }
        ingredient={ ingredient }
        onChange={ this.handleIngredientChange }
      />
    ));

    return (
      <article>
        <form>
          <label>
            Name des Rezepts:
            <input
              type='text'
              value={ this.state.name }
              onChange={ this.handleNameChange }
            />
          </label>
          <label>Zutaten</label>
          <article>
            {ingredientList}
            <button type='button' onClick={ () => this.handleAddIngredient() }>Zutat hinzufügen</button>
          </article>
          <button type='button' onClick={ () => this.handleRecipeSave() }>Speichern</button>
        </form>
      </article>
    );
  }
}
