import { IngredientsList } from '../../components/IngredientsList';
import { Recipe } from '../../types/Recipe';
import { RecipeChangeHandler } from '../RecipeForm/types/RecipeChangeHandler';
import { RecipeForm } from '../RecipeForm/RecipeForm';
import { FunctionComponent, ReactElement } from 'react';

interface RecipeListProps {
  recipes: Recipe[];
  onSaveChanges: RecipeChangeHandler;
  onToggleEdit: RecipeChangeHandler;
}

const RecipeList: FunctionComponent<RecipeListProps> = ({ recipes, onSaveChanges, onToggleEdit }): ReactElement => {
  const listComponents: ReactElement[] = recipes.map((recipe: Recipe): ReactElement => {
    const subContent: ReactElement = recipe.showEditForm ?
      <RecipeForm recipe={ recipe } onSave={ onSaveChanges } /> :
      <IngredientsList items={ recipe.ingredients } />;

    return (
      <li key={ recipe.id }>
        { recipe.name } (<a onClick={ (): void => onToggleEdit(recipe) }>Bearbeiten</a>)
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
