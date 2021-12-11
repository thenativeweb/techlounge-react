import { Ingredient } from '../types/Ingredient';
import { IngredientsList } from '../components/IngredientsList';
import { RecipeForm } from './RecipeForm';
import { RecipeList } from './RecipeList/RecipeList';
import { sumRecipeIngredients } from './recipeStateService';
import { useRecipeApi } from '../api/useRecipeApi';
import { Watch } from './Watch';
import { FunctionComponent, ReactElement, useMemo } from 'react';
import { Tab, TabController } from '../components/tabs';

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
    <main>
      <Watch />
      <TabController>
        <Tab headline='Einkaufsliste'>
          <IngredientsList items={ recipeSum } />
        </Tab>
        <Tab headline='Rezepte'>
          <RecipeList recipes={ recipes } onSaveChanges={ updateRecipe } />
        </Tab>
        <Tab headline='Neues Rezept'>
          <RecipeForm onSave={ addRecipe } />
        </Tab>
      </TabController>
    </main>
  );
};

export { ShoppingList };
