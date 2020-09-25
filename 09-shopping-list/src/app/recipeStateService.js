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

export const sumRecipeIngridients = function (recipes) {
  return recipes.reduce((list, recipe) => [ ...list, ...recipe.ingridients ], []).
    reduce((list, ingridient) => {
      const existingItem = list.find(searchItem => searchItem.name === ingridient.name);

      if (existingItem) {
        existingItem.amount += ingridient.amount;
      } else {
        list.push({ ...ingridient });
      }

      return list;
    }, []);
};
