import React from 'react';
import { IngredientsList } from '../../components/IngredientsList';
import { RecipeForm } from '../RecipeForm/RecipeForm';

export const RecipeList = props => {
  const listComponents = props.recipes.map(recipe => {
    const subContent = recipe.showEditForm ?
      <RecipeForm recipe={ recipe } onSave={ props.onSaveChanges } /> :
      <IngredientsList items={ recipe.ingredients } />;

    return (
      <li key={ recipe.id }>
        { recipe.name } (<a onClick={ () => props.onToggleEdit(recipe) }>Bearbeiten</a>)
        { subContent }
      </li>
    );
  });

  return (
    <ul>
      { listComponents }
    </ul>
  );
};
