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
  const [ error, setError ] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/recipes').
      then(response => response.json()).
      catch(error_ => {
        console.error(`Fehler beim Laden der API. Wurde diese mit 'npm run start-backend' gestartet?`, error_);
        setError(error_);
      }).
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

  if (error) {
    return (
      <main>Fehler beim Laden der Rezepte...</main>
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
        <Tabs headline='Neues Rezept'>
          <RecipeForm onSave={ changeRecipeStateWith(addRecipe) } />
        </Tabs>
      </TabController>
    </main>
  );
};
