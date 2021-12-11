import { IngredientsList } from '../../components/IngredientsList';
import { Recipe } from '../../types/Recipe';
import { RecipeForm } from '../RecipeForm';
import { Fragment, FunctionComponent, ReactElement, useState } from 'react';

interface RecipeItemProps {
  recipe: Recipe;
  onSaveChanges: (recipe: Recipe) => void;
}
const RecipeItem: FunctionComponent<RecipeItemProps> = ({ recipe, onSaveChanges }): ReactElement => {
  const [ showEditForm, setShowEditForm ] = useState(false);

  const onToggleEdit = (): void => {
    setShowEditForm(true);
  };

  const handleSave = (saveRecipe: Recipe): void => {
    setShowEditForm(false);
    onSaveChanges(saveRecipe);
  };

  const subContent = showEditForm ?
    <RecipeForm recipe={ recipe } onSave={ handleSave } /> :
    <IngredientsList items={ recipe.ingredients } />;

  return (
    <Fragment>
      { recipe.name }
      {' '}
      <a
        onClick={ (): void => onToggleEdit() }
        aria-label={ `${recipe.name} bearbeiten` }
      >
            Bearbeiten
      </a>
      {subContent}
    </Fragment>
  );
};

export {
  RecipeItem
};
