import { IngredientsList } from '../components/IngredientsList';
import { Recipe } from '../types/Recipe';
import { RecipeForm } from './RecipeForm/RecipeForm';
import { RecipeList } from './RecipeList/RecipeList';
import { Watch } from './Watch';
import { addRecipe, toggleEditForm, updateRecipe, sumRecipeIngredients, RecipeListChange } from './recipeStateService';
import { Tab, TabController } from '../components/tabs';
import { useState, useEffect, FunctionComponent, ReactElement } from 'react';

const App: FunctionComponent = (): ReactElement => {
  const [ recipes, setRecipes ] = useState<Recipe[]>([]);
  const [ isLoading, setIsLoading ] = useState<boolean>(true);

  useEffect(() => {
    fetch('http://localhost:3000/recipes').
      then(async response => response.json()).
      then((loadedRecipes: Recipe[]) => {
        setIsLoading(false);
        setRecipes(loadedRecipes);
      });
  }, []);

  const changeRecipeStateWith = (recipeStateServiceFunction: RecipeListChange) =>
    (recipe: Recipe): void => setRecipes(recipeStateServiceFunction(recipes, recipe));

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
