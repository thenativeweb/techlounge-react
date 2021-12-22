import { FetchApiContext } from './ApiContext';
import { Recipe } from '../types/Recipe';
import { addRecipeToList, updateRecipeInList } from '../app/recipeStateService';
import { useCallback, useContext, useEffect, useState } from 'react';

type ApiStatus = 'loading' | 'success' | 'error';

interface UseRecipeApi {
  recipes: Recipe[];
  apiStatus: ApiStatus;
  addRecipe: (recipe: Recipe) => void;
  updateRecipe: (recipe: Recipe) => void;
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

  const updateRecipe = useCallback((recipe: Recipe): void => {
    setRecipes((currentRecipes): Recipe[] => updateRecipeInList(currentRecipes, recipe));
  }, []);

  return {
    recipes,
    apiStatus,
    addRecipe,
    updateRecipe
  };
};

export {
  useRecipeApi,
  ApiStatus
};
