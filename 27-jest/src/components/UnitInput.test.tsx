import { noop } from '../../fixtures/noop';
import { UnitInput } from './UnitInput';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

describe('UnitInput', (): void => {
  it('sets the selected input as value.', async (): Promise<void> => {
    render(
      <UnitInput
        value='Liter'
        onChange={ noop }
      />
    );

    expect(screen.getByDisplayValue('Liter')).not.toBeNull();
  });

  it('when new value is selected, calls callback with the newly selected value.', async (): Promise<void> => {
    const onChangeSpy = jest.fn();

    render(
      <UnitInput
        value='Liter'
        onChange={ onChangeSpy }
      />
    );
    const selectBox = screen.getByDisplayValue('Liter');

    userEvent.selectOptions(selectBox, 'Stück');

    expect(onChangeSpy).toHaveBeenCalledTimes(1);
    expect(onChangeSpy).toHaveBeenCalledWith('Stück');
  });
});
