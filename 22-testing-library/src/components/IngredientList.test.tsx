import { assert } from 'assertthat';
import { createIngredient } from '../../fixtures/createIngredient';
import { IngredientsList } from './IngredientsList';
import { render } from '@testing-library/react';

describe('IngredientList', (): void => {
  it('given no ingredients, renders empty list.', async (): Promise<void> => {
    const { getByLabelText } = render(<IngredientsList items={ [] } />);

    assert.that(getByLabelText('Zutaten')).is.not.null();
    assert.that(getByLabelText('Zutaten').children.length).is.equalTo(0);
  });

  it('given single ingredient, ,enderes the name, amount and unit as text.', async (): Promise<void> => {
    const ingredient = createIngredient({
      amount: 200,
      name: 'TestIngredient',
      unit: 'Liter'
    });

    const { getByText } = render(
      <IngredientsList items={ [ ingredient ] } />
    );

    assert.that(getByText('200 Liter TestIngredient')).is.not.null();
  });

  it('given multiple items, renders them all.', async (): Promise<void> => {
    const ingredients = [
      createIngredient({ name: 'First', amount: 1, unit: 'Gramm' }),
      createIngredient({ name: 'Second', amount: 2, unit: 'Liter' }),
      createIngredient({ name: 'Third', amount: 3, unit: 'Stück' })
    ];

    const { getByText } = render(
      <IngredientsList items={ ingredients } />
    );

    assert.that(getByText('1 Gramm First')).is.not.null();
    assert.that(getByText('2 Liter Second')).is.not.null();
    assert.that(getByText('3 Stück Third')).is.not.null();
  });
});
