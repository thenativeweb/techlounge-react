import { IngredientsList } from '../../components/IngredientsList';
import PropTypes from 'prop-types';
import { RecipeForm } from '../RecipeForm/RecipeForm';
import React from 'react';

const RecipeList = ({ recipes, onSaveChanges, onToggleEdit }) => {
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

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired,
  onSaveChanges: PropTypes.func.isRequired,
  onToggleEdit: PropTypes.func.isRequired
};

export { RecipeList };
