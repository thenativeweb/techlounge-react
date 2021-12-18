import { Recipe } from '../../types/Recipe';
import { RecipeChangeHandler } from '../RecipeForm/types/RecipeChangeHandler';
import { RecipeItem } from './RecipeItem';
import { FunctionComponent, memo, ReactElement } from 'react';

interface RecipeListProps {
  recipes: Recipe[];
  onSaveChanges: RecipeChangeHandler;
}

const MemoizedRecipeItem = memo(RecipeItem);

const RecipeList: FunctionComponent<RecipeListProps> = ({ recipes, onSaveChanges }): ReactElement => {
  const listComponents: ReactElement[] = recipes.map((recipe: Recipe): ReactElement => (
    <li key={ recipe.id }>
      <MemoizedRecipeItem recipe={ recipe } onSaveChanges={ onSaveChanges } />
    </li>
  ));

  return (
    <ul aria-label='Rezepte'>
      { listComponents }
    </ul>
  );
};

export { RecipeList };
