import { clearField } from './clearField';
import { ElementHandle } from 'puppeteer';
import { queries } from 'pptr-testing-library';
import { Unit } from '../../src/types/Unit';

interface IngredientFormArgs {
  name: string;
  amount: string;
  unit: Unit;
}

const { getByLabelText } = queries;

const fillIngredientFormWith = async ($document: ElementHandle, formId: string, {
  name,
  amount,
  unit
}: IngredientFormArgs): Promise<void> => {
  const $form = await getByLabelText($document, formId);

  const $recipeNameInput = await getByLabelText($form, 'Zutat:');
  const $amountInput = await getByLabelText($form, 'Menge:');
  const $unitInput = await getByLabelText($form, 'Mengeneinheit');

  await clearField($recipeNameInput);
  await $recipeNameInput.type(name);

  await clearField($amountInput);
  await $amountInput.type(amount);

  await $unitInput.select(unit);
};

export {
  fillIngredientFormWith
};
