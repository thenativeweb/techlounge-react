export const addRecipe = function (recipes, newRecipe) {
  return [
    ...recipes,
    {
      id: recipes.length + 1,
      showEditForm: false,
      ...newRecipe
    }
  ];
};

export const toggleEditForm = function (recipes, changedRecipe) {
  return recipes.map(recipe => {
    if (recipe.id === changedRecipe.id) {
      return {
        ...changedRecipe,
        showEditForm: !changedRecipe.showEditForm
      };
    }

    return recipe;
  });
};

export const updateRecipe = function (recipes, changedRecipe) {
  return recipes.map(recipe => {
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

export const sumRecipeIngredients = function (recipes) {
  return recipes.reduce((list, recipe) => [ ...list, ...recipe.ingredients ], []).
    reduce((list, ingredient) => {
      const existingItem = list.find(searchItem => searchItem.name === ingredient.name);

      if (existingItem) {
        existingItem.amount += ingredient.amount;
      } else {
        list.push({ ...ingredient });
      }

      return list;
    }, []);
};
