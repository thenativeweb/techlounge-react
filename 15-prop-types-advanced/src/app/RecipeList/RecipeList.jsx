import { IngredientsList } from '../../components/IngredientsList';
import PropTypes from 'prop-types';
import React from 'react';
import { RecipeForm } from '../RecipeForm/RecipeForm';
import { RecipeType } from '../../types/RecipeTypes';

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
  recipes: PropTypes.arrayOf(RecipeType).isRequired,
  onSaveChanges: PropTypes.func.isRequired,
  onToggleEdit: PropTypes.func.isRequired
};

export { RecipeList };
