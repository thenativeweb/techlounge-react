import React from 'react';
import { IngridientFormPart } from './IngridientFormPart';
import './RecipeForm.css';

const createEmptyIngridient = () => ({
  name: '',
  amount: '',
  unit: 'Stück'
});

const emptyState = {
  id: null,
  name: '',
  ingridients: [ createEmptyIngridient() ]
};

export class RecipeForm extends React.Component {
  constructor (props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleIngridientChange = this.handleIngridientChange.bind(this);
    this.handleRecipeSave = this.handleRecipeSave.bind(this);

    if (this.props.recipe) {
      this.state = {
        id: this.props.recipe.id,
        name: this.props.recipe.name,
        ingridients: this.props.recipe.ingridients
      };
    } else {
      this.state = emptyState;
    }
  }

  handleAddIngridient () {
    this.setState(currentState => (
      {
        ...currentState,
        ingridients: [
          ...currentState.ingridients,
          createEmptyIngridient()
        ]
      }
    ));
  }

  handleIngridientChange (event, ingridientName) {
    const { value, name } = event.target;

    this.setState(currentState => ({
      ...currentState,
      ingridients: currentState.ingridients.map(ingridient => {
        if (ingridient.name === ingridientName) {
          return {
            ...ingridient,
            [name]: value
          };
        }

        return ingridient;
      })
    }));
  }

  handleNameChange (event) {
    this.setState({
      name: event.target.value
    });
  }

  handleRecipeSave () {
    const finishedIngridients = this.state.ingridients.map(ingridient => ({
      ...ingridient,
      amount: Number.parseFloat(ingridient.amount)
    }));

    this.props.onSave({
      id: this.state.id,
      name: this.state.name,
      ingridients: finishedIngridients
    });

    this.setState(emptyState);
  }

  render () {
    const ingridientList = this.state.ingridients.map((ingridient, index) => (
      <IngridientFormPart
        key={ `ingridient-${index}` }
        ingridient={ ingridient }
        index={ index }
        onChange={ this.handleIngridientChange }
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
            {ingridientList}
            <button type='button' onClick={ () => this.handleAddIngridient() }>Zutat hinzufügen</button>
          </article>
          <button type='button' onClick={ () => this.handleRecipeSave() }>Speichern</button>
        </form>
      </article>
    );
  }
}
