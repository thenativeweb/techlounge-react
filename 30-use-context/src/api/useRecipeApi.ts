import { FetchApiContext } from './ApiContext';
import { Recipe } from '../types/Recipe';
import { addRecipeToList, toggleEditFormInList, updateRecipeInList } from '../app/recipeStateService';
import { useContext, useEffect, useState } from 'react';

type ApiStatus = 'loading' | 'success' | 'error';

interface UseRecipeApi {
  recipes: Recipe[];
  apiStatus: ApiStatus;
  addRecipe: (recipe: Recipe) => void;
  updateRecipe: (recipe: Recipe) => void;
  toggleEditForm: (recipe: Recipe) => void;
}

const useRecipeApi = (): UseRecipeApi => {
  const recipeApi = useContext(FetchApiContext);
  const [ recipes, setRecipes ] = useState<Recipe[]>([]);
  const [ apiStatus, setApiStatus ] = useState<ApiStatus>('loading');

  useEffect((): void => {
    recipeApi.fetchAllRecipes().
      then(async (loadedRecipes: Recipe[]): Promise<void> => {
        setApiStatus('success');
        setRecipes(loadedRecipes);
      }).
      catch((ex: Error): void => {
        // eslint-disable-next-line no-console
        console.error(`There was an error during fetch:`, ex);
        setApiStatus('error');
      });
  }, []);

  const addRecipe = (recipe: Recipe): void => {
    setRecipes((currentRecipes): Recipe[] => addRecipeToList(currentRecipes, recipe));
  };

  const updateRecipe = (recipe: Recipe): void => {
    setRecipes((currentRecipes): Recipe[] => updateRecipeInList(currentRecipes, recipe));
  };

  const toggleEditForm = (recipe: Recipe): void => {
    setRecipes((currentRecipes): Recipe[] => toggleEditFormInList(currentRecipes, recipe));
  };

  return {
    recipes,
    apiStatus,
    addRecipe,
    updateRecipe,
    toggleEditForm
  };
};

export {
  useRecipeApi,
  ApiStatus
};
