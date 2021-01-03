import React from 'react';
import { IngredientsList } from '../../components/IngredientsList';
import { RecipeForm } from '../RecipeForm/RecipeForm';

export const RecipeList = ({ recipes, onSaveChanges, onToggleEdit }) => {
  const listComponents = recipes.map(recipe => {
    const subContent = recipe.showEditForm ?
      <RecipeForm recipe={ recipe } onSave={ onSaveChanges } /> :
      <IngredientsList items={ recipe.ingredients } />;

    return (
      <li key={ recipe.id }>
        { recipe.name } (<a onClick={ () => onToggleEdit(recipe) }>Bearbeiten</a>)
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
