import React from 'react';

import { RecipeList } from './RecipeList/RecipeList';
import { RecipeForm } from './RecipeForm/RecipeForm';
import { IngridientsList } from '../components/IngridientsList';
import { Tab, TabController } from '../components/tabs';
import { addRecipe, toggleEditForm, updateRecipe, sumRecipeIngridients } from './recipeStateService';

export class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      loading: true,
      recipes: []
    };

    this.handleToggleEdit = this.handleToggleEdit.bind(this);
    this.handleRecipeEdit = this.handleRecipeEdit.bind(this);
    this.handleRecipeSave = this.handleRecipeSave.bind(this);
  }

  componentDidMount () {
    fetch('http://localhost:3000/recipes').
      then(response => response.json()).
      then(recipes => {
        this.setState({
          loading: false,
          recipes
        });
      });
  }

  handleRecipeSave (newRecipe) {
    this.setState(currentState => ({
      ...currentState,
      recipes: addRecipe(currentState.recipes, newRecipe)
    }));
  }

  handleToggleEdit (recipe) {
    this.setState(currentState => ({
      ...currentState,
      recipes: toggleEditForm(currentState.recipes, recipe)
    }));
  }

  handleRecipeEdit (changedRecipe) {
    this.setState(currentState => ({
      ...currentState,
      recipes: updateRecipe(currentState.recipes, changedRecipe)
    }));
  }

  render () {
    if (this.state.loading) {
      return (
        <main>Lade Rezepte...</main>
      );
    }

    return (
      <main>
        <TabController>
          <Tab headline='Einkaufliste'>
            <IngridientsList items={ sumRecipeIngridients(this.state.recipes) } />
          </Tab>
          <Tab headline='Rezepte'>
            <RecipeList recipes={ this.state.recipes } onToggleEdit={ this.handleToggleEdit } onSaveChanges={ this.handleRecipeEdit } />
          </Tab>
          <Tab headline='Neues Rezept'>
            <RecipeForm onSave={ this.handleRecipeSave } />
          </Tab>
        </TabController>
      </main>
    );
  }
}
