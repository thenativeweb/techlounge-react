import { IngredientsList } from '../components/IngredientsList';
import { Recipe } from '../types/Recipe';
import { RecipeForm } from './RecipeForm/RecipeForm';
import { RecipeList } from './RecipeList/RecipeList';
import { Watch } from './Watch';
import { addRecipe, toggleEditForm, updateRecipe, sumRecipeIngredients, RecipeListChanger } from './recipeStateService';
import { Tab, TabController } from '../components/tabs';
import { useState, useEffect, FunctionComponent, ReactElement } from 'react';
import { RecipeChangeHandler } from './RecipeForm/types/RecipeChangeHandler';

const App: FunctionComponent = (): ReactElement => {
  const [ recipes, setRecipes ] = useState<Recipe[]>([]);
  const [ isLoading, setIsLoading ] = useState<boolean>(true);

  useEffect((): void => {
    fetch('http://localhost:3000/recipes').
      then(async (response: Response): Promise<Recipe[]> => response.json()).
      then(async (loadedRecipes: Recipe[]): Promise<void> => {
        setIsLoading(false);
        setRecipes(loadedRecipes);
      });
  }, []);

  const changeRecipeStateWith = (recipeListChanger: RecipeListChanger): RecipeChangeHandler =>
    (recipe: Recipe): void => setRecipes(recipeListChanger(recipes, recipe));

  if (isLoading) {
    return (
      <main>Lade Rezepte...</main>
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
