import { IngredientsList } from '../components/IngredientsList';
import { Recipe } from '../types/Recipe';
import { RecipeApi } from '../api/RecipeApi';
import { RecipeChangeHandler } from './RecipeForm/types/RecipeChangeHandler';
import { RecipeForm } from './RecipeForm';
import { RecipeList } from './RecipeList/RecipeList';
import { Watch } from './Watch';
import { addRecipe, RecipeListChanger, sumRecipeIngredients, toggleEditForm, updateRecipe } from './recipeStateService';
import { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { Tab, TabController } from '../components/tabs';

interface AppProps {
  recipeApi: RecipeApi;
}

type ApiState = 'success' | 'loading' | 'error';

const App: FunctionComponent<AppProps> = ({ recipeApi }): ReactElement => {
  const [ recipes, setRecipes ] = useState<Recipe[]>([]);
  const [ apiState, setApiState ] = useState<ApiState>('loading');

  useEffect((): void => {
    recipeApi.fetchAllRecipes().
      then(async (loadedRecipes: Recipe[]): Promise<void> => {
        setApiState('success');
        setRecipes(loadedRecipes);
      }).
      catch((ex: Error): void => {
        // eslint-disable-next-line no-console
        console.error(`There was an error during fetch:`, ex);
        setApiState('error');
      });
  }, []);

  const changeRecipeStateWith = (recipeListChanger: RecipeListChanger): RecipeChangeHandler =>
    (recipe): void => setRecipes(recipeListChanger(recipes, recipe));

  if (apiState === 'loading') {
    return (
      <main>Lade Rezepte...</main>
    );
  }

  if (apiState === 'error') {
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
          <RecipeList recipes={ recipes } onToggleEdit={ changeRecipeStateWith(toggleEditForm) } onSaveChanges={ changeRecipeStateWith(updateRecipe) } />
        </Tab>
        <Tab headline='Neues Rezept'>
          <RecipeForm onSave={ changeRecipeStateWith(addRecipe) } />
        </Tab>
      </TabController>
    </main>
  );
};

export { App };
