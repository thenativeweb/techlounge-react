import { Ingredient } from '../types/Ingredient';
import { IngredientsList } from '../components/IngredientsList';
import { Navigation } from './Navigation';
import { Page } from './Page';
import { RecipeForm } from './RecipeForm';
import { RecipeList } from './RecipeList/RecipeList';
import { sumRecipeIngredients } from './recipeStateService';
import { useRecipeApi } from '../api/useRecipeApi';
import { Fragment, FunctionComponent, ReactElement, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';

const navs = [
  { link: '/', title: 'Einkaufsliste' },
  { link: '/recipes', title: 'Rezepte' },
  { link: '/new-recipe', title: 'Neues Rezept' }
];

const ShoppingList: FunctionComponent = (): ReactElement => {
  const {
    recipes,
    apiStatus,
    addRecipe,
    updateRecipe
  } = useRecipeApi();

  const recipeSum = useMemo((): Ingredient[] => sumRecipeIngredients(recipes), [ recipes ]);

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
    <Fragment>
      <Navigation navConfiguration={ navs } />
      <main>
        <Routes>
          <Route
            path='/'
            element={
              <Page title='Einkaufsliste'>
                <IngredientsList items={ recipeSum } />
              </Page>
            }
          />
          <Route
            path='/recipes'
            element={
              <Page title='Rezepte'>
                <RecipeList recipes={ recipes } onSaveChanges={ updateRecipe } />
              </Page>
            }
          />
          <Route
            path='/new-recipe'
            element={
              <Page title='Neues Rezept'>
                <RecipeForm onSave={ addRecipe } />
              </Page>
            }
          />
        </Routes>
      </main>
    </Fragment>
  );
};

export { ShoppingList };
