import React from 'react';
import { IngridientsList } from '../../components/IngridientsList';
import { RecipeForm } from '../RecipeForm/RecipeForm';

export class RecipeList extends React.Component {
  render () {
    const listComponents = this.props.recipes.map(recipe => {
      const subContent = recipe.showEditForm ?
        <RecipeForm recipe={ recipe } onSave={ this.props.onSaveChanges } /> :
        <IngridientsList items={ recipe.ingridients } />;

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
