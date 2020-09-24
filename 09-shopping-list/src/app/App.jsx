import React from 'react';

import { RecipeList } from './RecipeList/RecipeList';
import { RecipeForm } from './RecipeForm/RecipeForm';
import { IngridientsList } from '../components/IngridientsList';
import { Tab, TabController } from '../components/tabs';

const mockRecepies = [
  {
    id: 1,
    name: 'Apfelkuchen',
    showEditForm: false,
    ingridients: [
      {
        name: 'Zucker',
        amount: 200,
        unit: 'Gramm'
      },
      {
        name: 'Apfel',
        amount: 4,
        unit: 'Stück'
      },
      {
        name: 'Mehl',
        amount: 400,
        unit: 'Gramm'
      }
    ]
  },
  {
    id: 2,
    name: 'Pudding',
    showEditForm: false,
    ingridients: [
      {
        name: 'Zucker',
        amount: 300,
        unit: 'Gramm'
      },
      {
        name: 'Milch',
        amont: 0.5,
        unit: 'Liter'
      },
      {
        name: 'Pudding',
        amount: 1,
        unit: 'Stück'
      }
    ]
  }
];

export class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      recipes: mockRecepies
    };

    this.handleEnableEdit = this.handleEnableEdit.bind(this);
    this.handleRecipeEdit = this.handleRecipeEdit.bind(this);
    this.handleRecipeSave = this.handleRecipeSave.bind(this);
  }

  sumComponents () {
    return this.state.recipes.
      reduce((list, recipe) => [ ...list, ...recipe.ingridients ], []).
      reduce((list, ingridient) => {
        const existingItem = list.find(searchItem => searchItem.name === ingridient.name);

        if (existingItem) {
          existingItem.amount += ingridient.amount;
        } else {
          list.push({ ...ingridient });
        }

        return list;
      }, []);
  }

  handleRecipeSave (newRecipe) {
    this.setState(currentState => ({ recipes: [
      ...currentState.recipes,
      {
        id: currentState.recipes.length + 1,
        showEditForm: false,
        ...newRecipe
      }
    ]}));
  }

  handleEnableEdit (changedRecipe) {
    this.setState(currentState => ({
      ...currentState,
      recipes: currentState.recipes.map(recipe => {
        if (recipe.id === changedRecipe.id) {
          return {
            ...recipe,
            showEditForm: true
          };
        }

        return recipe;
      })
    }));
  }

  handleRecipeEdit (changedRecipe) {
    this.setState(currentState => ({
      ...currentState,
      recipes: currentState.recipes.map(recipe => {
        if (recipe.id === changedRecipe.id) {
          return {
            ...recipe,
            ...changedRecipe,
            showEditForm: false
          };
        }

        return recipe;
      })
    }));
  }

  render () {
    const summedList = this.sumComponents();

    return (
      <main>
        <TabController>
          <Tab headline='Einkaufliste'>
            <IngridientsList items={ summedList } />
          </Tab>
          <Tab headline='Rezepte'>
            <RecipeList recipes={ this.state.recipes } onEnableEdit={ this.handleEnableEdit } onSaveChanges={ this.handleRecipeEdit } />
          </Tab>
          <Tab headline='Neues Rezept'>
            <RecipeForm onSave={ this.handleRecipeSave } />
          </Tab>
        </TabController>
      </main>
    );
  }
}
