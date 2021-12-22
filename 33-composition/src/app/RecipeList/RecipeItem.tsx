import { ComponentToggle } from '../../components/ComponentToggle';
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

  const handleSave = (saveRecipe: Recipe): void => {
    setShowEditForm(false);
    onSaveChanges(saveRecipe);
  };

  return (
    <Fragment>
      { recipe.name }
      {' '}
      <ComponentToggle
        TriggerComponent={ (props): ReactElement => (
          // eslint-disable-next-line react/jsx-no-target-blank
          <a
            aria-label={ `${recipe.name} bearbeiten` }
            { ...props }
          >Bearbeiten
          </a>
        ) }
        openedElement={
          <RecipeForm recipe={ recipe } onSave={ handleSave } />
        }
        closedElement={
          <IngredientsList items={ recipe.ingredients } />
        }
      />
    </Fragment>
  );
};

export {
  RecipeItem
};
