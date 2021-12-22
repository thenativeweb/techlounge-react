import { IngredientsList } from '../../components/IngredientsList';
import { Recipe } from '../../types/Recipe';
import { RecipeForm } from '../RecipeForm';
import { ComponentToggle, ContentComponent, TriggerComponent } from '../../components/ComponentToggle';
import { Fragment, FunctionComponent, ReactElement } from 'react';

interface RecipeItemProps {
  recipe: Recipe;
  onSaveChanges: (recipe: Recipe) => void;
}
const RecipeItem: FunctionComponent<RecipeItemProps> = ({ recipe, onSaveChanges }): ReactElement => {
  const handleSave = (saveRecipe: Recipe): void => {
    onSaveChanges(saveRecipe);
  };

  const TriggerButton: TriggerComponent = (props): ReactElement => (
    // eslint-disable-next-line react/jsx-no-target-blank
    <a aria-label={ `${recipe.name} bearbeiten` } { ...props }>Bearbeiten</a>
  );

  const ToggleRecipeForm: ContentComponent = ({ toggle }): ReactElement => (
    <RecipeForm
      recipe={ recipe } onSave={ (savedRecipe: Recipe): void => {
        handleSave(savedRecipe);
        toggle();
      } }
    />
  );

  return (
    <Fragment>
      { recipe.name }
      {' '}
      <ComponentToggle
        TriggerComponent={ TriggerButton }
        openedElement={ ToggleRecipeForm }
        closedElement={ <IngredientsList items={ recipe.ingredients } /> }
      />
    </Fragment>
  );
};

export {
  RecipeItem
};
