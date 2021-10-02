import { createIngredient } from '../../fixtures/createIngredient';
import { IngredientsList } from './IngredientsList';
import { render, screen } from '@testing-library/react';

describe('IngredientList', (): void => {
  it('given no ingredients, renders an empty list.', async (): Promise<void> => {
    render(<IngredientsList items={ [] } />);

    expect(screen.getByLabelText('Zutaten')).not.toBeNull();
    expect(screen.getByLabelText('Zutaten').children.length).toEqual(0);
  });

  it('given single ingredient, renderes the name, amount and unit as text.', async (): Promise<void> => {
    const ingredient = createIngredient({
      amount: 200,
      name: 'TestIngredient',
      unit: 'Liter'
    });

    render(
      <IngredientsList items={ [ ingredient ] } />
    );

    expect(screen.getByText('200 Liter TestIngredient')).not.toBeNull();
  });

  it('given multiple items, renders them all.', async (): Promise<void> => {
    const ingredients = [
      createIngredient({ name: 'First', amount: 1, unit: 'Gramm' }),
      createIngredient({ name: 'Second', amount: 2, unit: 'Liter' }),
      createIngredient({ name: 'Third', amount: 3, unit: 'Stück' })
    ];

    render(
      <IngredientsList items={ ingredients } />
    );

    expect(screen.getByText('1 Gramm First')).not.toBeNull();
    expect(screen.getByText('2 Liter Second')).not.toBeNull();
    expect(screen.getByText('3 Stück Third')).not.toBeNull();
  });
});
