import { Recipe } from '../../types/Recipe';
import { RecipeChangeHandler } from '../RecipeForm/types/RecipeChangeHandler';
import { RecipeItem } from './RecipeItem';
import { FunctionComponent, ReactElement } from 'react';

interface RecipeListProps {
  recipes: Recipe[];
  onSaveChanges: RecipeChangeHandler;
}

const RecipeList: FunctionComponent<RecipeListProps> = ({ recipes, onSaveChanges }): ReactElement => {
  const listComponents: ReactElement[] = recipes.map((recipe: Recipe): ReactElement => (
    <li key={ recipe.id }>
      <RecipeItem recipe={recipe} onSaveChanges={onSaveChanges} />
    </li>
  ));

  return (
    <ul aria-label='Rezepte'>
      { listComponents }
    </ul>
  );
};

export { RecipeList };
