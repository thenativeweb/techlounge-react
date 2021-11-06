import { IngredientsList } from '../components/IngredientsList';
import { RecipeApi } from '../api/RecipeApi';
import { RecipeForm } from './RecipeForm';
import { RecipeList } from './RecipeList/RecipeList';
import { sumRecipeIngredients } from './recipeStateService';
import { useRecipeApi } from '../api/useRecipeApi';
import { Watch } from './Watch';
import { FunctionComponent, ReactElement } from 'react';
import { Tab, TabController } from '../components/tabs';

interface AppProps {
  recipeApi: RecipeApi;
}

const App: FunctionComponent<AppProps> = ({ recipeApi }): ReactElement => {
  const {
    recipes,
    apiStatus,
    addRecipe,
    toggleEditForm,
    updateRecipe
  } = useRecipeApi(recipeApi);

  if (apiStatus === 'loading') {
    return (
      <main>Lade Rezepte...</main>
    );
  }

  if (apiStatus === 'error') {
    return (
      <main>Fehler beim Laden der Rezepte. Bitte versuchen sie es später erneut.</main>
    );
  }

  return (
    <main>
      <Watch />
      <TabController>
        <Tab headline='Einkaufsliste'>
          <IngredientsList items={ sumRecipeIngredients(recipes) } />
        </Tab>
        <Tab headline='Rezepte'>
          <RecipeList recipes={ recipes } onToggleEdit={ toggleEditForm } onSaveChanges={ updateRecipe } />
        </Tab>
        <Tab headline='Neues Rezept'>
          <RecipeForm onSave={ addRecipe } />
        </Tab>
      </TabController>
    </main>
  );
};

export { App };
