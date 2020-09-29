import React from 'react';
import { IngredientsList } from '../../components/IngredientsList';
import { RecipeForm } from '../RecipeForm/RecipeForm';

export class RecipeList extends React.Component {
  render () {
    const listComponents = this.props.recipes.map(recipe => {
      const subContent = recipe.showEditForm ?
        <RecipeForm recipe={ recipe } onSave={ this.props.onSaveChanges } /> :
        <IngredientsList items={ recipe.ingredients } />;

      return (
        <li key={ recipe.id }>
          { recipe.name } (<a onClick={ () => this.props.onToggleEdit(recipe) }>Bearbeiten</a>)
          { subContent }
        </li>
      );
    });

    return (
      <ul>
        { listComponents }
      </ul>
    );
  }
}
