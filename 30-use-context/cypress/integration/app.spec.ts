import { fillIngredientFormWith } from './fillIngredientFormWith';

describe('Recipe App Tests', (): void => {
  it('opens the app and show the empty shopping-list.', (): void => {
    cy.visit('/');

    cy.contains('Einkaufsliste');
  });

  it('fills out the recipe with all data and then shows it in the recipes tab.', (): void => {
    cy.visit('/');

    cy.findByText('Neues Rezept').click();
    cy.contains('Name des Rezepts:');

    cy.findByLabelText('Name des Rezepts:').type('FirstRecipe');
    fillIngredientFormWith('Zutat 1', { name: 'Zucker', amount: '20', unit: 'Gramm' });

    cy.findByLabelText('Zutat hinzufügen').click();
    fillIngredientFormWith('Zutat 2', { name: 'Milch', amount: '2', unit: 'Liter' });

    cy.findByLabelText('FirstRecipe speichern').click();

    cy.findByRole('tablist').within((): void => {
      cy.findByText('Rezepte').click();
    });

    cy.contains('FirstRecipe');
    cy.contains('20 Gramm Zucker');
    cy.contains('2 Liter Milch');
  });

  it('sums up all entered ingredients on the first page.', (): void => {
    cy.visit('/');

    cy.findByText('Neues Rezept').click();

    cy.findByLabelText('Name des Rezepts:').type('FirstRecipe');
    fillIngredientFormWith('Zutat 1', { name: 'Zucker', amount: '20', unit: 'Gramm' });
    cy.findByLabelText('FirstRecipe speichern').click();

    cy.findByLabelText('Name des Rezepts:').type('SecondRecipe');
    fillIngredientFormWith('Zutat 1', { name: 'Zucker', amount: '30', unit: 'Gramm' });
    cy.findByLabelText('SecondRecipe speichern').click();

    cy.findByText('Einkaufsliste').click();
    cy.contains('50 Gramm Zucker');
  });

  it('lets a user update a recipe in the recipe-section.', (): void => {
    cy.visit('/');

    cy.findByText('Neues Rezept').click();
    cy.contains('Name des Rezepts:');

    cy.findByLabelText('Name des Rezepts:').type('FirstRecipe');
    fillIngredientFormWith('Zutat 1', { name: 'Zucker', amount: '20', unit: 'Gramm' });
    cy.findByLabelText('FirstRecipe speichern').click();

    cy.findByText('Rezepte').click();

    cy.contains('FirstRecipe');
    cy.findByLabelText('FirstRecipe bearbeiten').click();
    fillIngredientFormWith('Zutat 1', { name: 'Milch', amount: '2', unit: 'Liter' });
    cy.findByLabelText('FirstRecipe speichern').click();

    cy.contains('2 Liter Milch');
  });
});
