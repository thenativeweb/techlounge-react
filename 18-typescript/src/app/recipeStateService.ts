import { Ingredient } from '../types/Ingredient';
import { Recipe } from '../types/Recipe';

type RecipeListChanger = (recipes: Recipe[], recipe: Recipe) => Recipe[];

const addRecipe: RecipeListChanger = function (recipes: Recipe[], newRecipe: Recipe): Recipe[] {
  return [
    ...recipes,
    {
      ...newRecipe,
      id: recipes.length + 1,
      showEditForm: false
    }
  ];
};

const toggleEditForm: RecipeListChanger = function (recipes: Recipe[], changedRecipe: Recipe): Recipe[] {
  return recipes.map((recipe: Recipe): Recipe => {
    if (recipe.id === changedRecipe.id) {
      return {
        ...changedRecipe,
        showEditForm: !changedRecipe.showEditForm
      };
    }

    return recipe;
  });
};

const updateRecipe: RecipeListChanger = function (recipes: Recipe[], changedRecipe: Recipe): Recipe[] {
  return recipes.map((recipe: Recipe): Recipe => {
    if (recipe.id === changedRecipe.id) {
      return {
        ...recipe,
        ...changedRecipe,
        showEditForm: false
      };
    }

    return recipe;
  });
};

const sumRecipeIngredients = function (recipes: Recipe[]): Ingredient[] {
  return recipes.
    reduce(
      (list: Ingredient[], recipe: Recipe): Ingredient[] => [ ...list, ...recipe.ingredients ], []
    ).
    reduce(
      (list: Ingredient[], ingredient: Ingredient): Ingredient[] => {
        const existingItem = list.find((searchItem: Ingredient): boolean => searchItem.name === ingredient.name);

        if (existingItem) {
          existingItem.amount += ingredient.amount;
        } else {
          list.push({ ...ingredient });
        }

        return list;
      }, []
    );
};

export { RecipeListChanger, addRecipe, toggleEditForm, updateRecipe, sumRecipeIngredients };
