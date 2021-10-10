import { assert } from 'assertthat';
import { fillIngredientFormWith } from './helpers/fillIngredientFormWith';
import puppeteer from 'puppeteer';
import { getDocument, queries } from 'pptr-testing-library';

const { getByText, getAllByText, getByLabelText, getByRole, findByLabelText, findByText } = queries;

describe('Puppeteer App Tests', function (): void {
  let browser: puppeteer.Browser;
  let $document: puppeteer.ElementHandle;

  this.timeout(5_000);

  before(async (): Promise<void> => {
    browser = await puppeteer.launch();
  });

  after(async (): Promise<void> => {
    await browser.close();
  });

  beforeEach(async (): Promise<void> => {
    const page = await browser.newPage();
    await page.goto('http://localhost:8080');

    $document = await getDocument(page);
  });

  it('opens the app and show the empty shopping-list.', async (): Promise<void> => {
    const $headline = await getAllByText($document, 'Einkaufsliste');

    assert.that($headline).is.not.empty();
  });

  it('fills out the recipe with all data and then shows it in the recipes tab.', async (): Promise<void> => {
    const $tabs = await getByRole($document, 'tablist');

    const $newRecipeTabButton = await getByText($tabs, 'Neues Rezept');
    await $newRecipeTabButton.click();

    const $recipeNameInput = await findByLabelText($document, 'Name des Rezepts:');
    await $recipeNameInput.type('FirstRecipe');
    await fillIngredientFormWith($document, 'Zutat 1', { name: 'Zucker', amount: '20', unit: 'Gramm' });

    const $newIngredientButton = await getByLabelText($document, 'Zutat hinzufügen');
    await $newIngredientButton.click();
    await fillIngredientFormWith($document, 'Zutat 2', { name: 'Milch', amount: '2', unit: 'Liter' });

    const $saveRecipeButton = await getByLabelText($document, 'FirstRecipe speichern');
    await $saveRecipeButton.click();

    const recipeTabButton = await getByText($tabs, 'Rezepte');
    await recipeTabButton.click();

    const $firstRecipeName = await findByText($document, 'FirstRecipe', { exact: false });
    const $firstIngredientText = await getByText($document, '20 Gramm Zucker');
    const $secondIngredientText = await getByText($document, '2 Liter Milch');

    assert.that($firstRecipeName).is.not.null();
    assert.that($firstIngredientText).is.not.null();
    assert.that($secondIngredientText).is.not.null();
  });

  it('sums up all entered ingredients on the first page.', async (): Promise<void> => {
    const $tabs = await getByRole($document, 'tablist');
    const $newRecipeTabButton = await getByText($tabs, 'Neues Rezept');

    await $newRecipeTabButton.click();
    const $recipeNameInput = await findByLabelText($document, 'Name des Rezepts:');
    await $recipeNameInput.type('FirstRecipe');
    await fillIngredientFormWith($document, 'Zutat 1', { name: 'Zucker', amount: '20', unit: 'Gramm' });

    const $saveRecipeButton = await getByLabelText($document, 'FirstRecipe speichern');
    await $saveRecipeButton.click();

    await $recipeNameInput.type('SecondRecipe');
    await fillIngredientFormWith($document, 'Zutat 1', { name: 'Zucker', amount: '30', unit: 'Gramm' });
    await $saveRecipeButton.click();

    const $shoppingListTabButton = await getByText($tabs, 'Einkaufsliste');
    await $shoppingListTabButton.click();

    const $summedIngredientText = await findByText($document, '50 Gramm Zucker');
    assert.that($summedIngredientText).is.not.null();
  });

  it('lets a user update a recipe in the recipe-section.', async (): Promise<void> => {
    const $tabs = await getByRole($document, 'tablist');
    const $newRecipeTabButton = await getByText($tabs, 'Neues Rezept');

    await $newRecipeTabButton.click();
    const $recipeNameInput = await findByLabelText($document, 'Name des Rezepts:');
    await $recipeNameInput.type('FirstRecipe');
    await fillIngredientFormWith($document, 'Zutat 1', { name: 'Zucker', amount: '20', unit: 'Gramm' });

    const $saveRecipeButton = await getByLabelText($document, 'FirstRecipe speichern');
    await $saveRecipeButton.click();

    const recipeTabButton = await getByText($tabs, 'Rezepte');
    await recipeTabButton.click();

    // Wait till page is loaded
    await findByText($document, 'FirstRecipe', { exact: false });

    const $editButton = await findByLabelText($document, 'FirstRecipe bearbeiten');
    await $editButton.click();
    await fillIngredientFormWith($document, 'Zutat 1', { name: 'Milch', amount: '2', unit: 'Liter' });

    const $saveRecipeButtonForEdit = await getByLabelText($document, 'FirstRecipe speichern');
    await $saveRecipeButtonForEdit.click();

    const $updatedIngredientText = await getByText($document, '2 Liter Milch');
    assert.that($updatedIngredientText).is.not.null();
  });
});
