import { FunctionComponent } from 'react';
import { IngredientsList } from '../../components/IngredientsList';
import { Recipe } from '../../types/Recipe';
import { RecipeChangeHandler } from '../RecipeForm/types/RecipeChangeHandler';
import { RecipeForm } from '../RecipeForm/RecipeForm';

interface RecipeListProps {
  recipes: Recipe[];
  onSaveChanges: RecipeChangeHandler;
  onToggleEdit: RecipeChangeHandler;
}

const RecipeList: FunctionComponent<RecipeListProps> = ({ recipes, onSaveChanges, onToggleEdit }) => {
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

export { RecipeList };
