import React, { useState, useEffect } from 'react';

import { RecipeList } from './RecipeList/RecipeList';
import { RecipeForm } from './RecipeForm/RecipeForm';
import { IngredientsList } from '../components/IngredientsList';
import { Tab, TabController } from '../components/tabs';
import { addRecipe, toggleEditForm, updateRecipe, sumRecipeIngredients } from './recipeStateService';
import { Watch } from './Watch';

export const App = () => {
  const [ recipes, setRecipes ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/recipes').
      then(response => response.json()).
      then(loadedRecipes => {
        setIsLoading(false);
        setRecipes(loadedRecipes);
      });
  }, []);

  const changeRecipeStateWith = recipeStateServiceFunction => recipe => setRecipes(recipeStateServiceFunction(recipes, recipe));

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
