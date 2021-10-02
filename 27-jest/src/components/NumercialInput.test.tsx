import { noop } from '../../fixtures/noop';
import { NumericalInput } from './NumericalInput';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

describe('NumericalInput', (): void => {
  it('displays the given number.', async (): Promise<void> => {
    const givenNumber = 2;

    render(
      <NumericalInput
        name='TestInput'
        value={ givenNumber }
        onChange={ noop }
      />
    );

    expect(screen.getByDisplayValue('2')).not.toBeNull();
  });

  it('it executes onChangeHandler  with the typed value as number.', async (): Promise<void> => {
    const onChangeSpy = jest.fn();

    render(
      <NumericalInput
        name='TestInput'
        value={ 2 }
        onChange={ onChangeSpy }
      />
    );

    const input = screen.getByDisplayValue('2');

    userEvent.type(input, '3');

    expect(onChangeSpy).toHaveBeenCalledTimes(1);
    expect(onChangeSpy).toHaveBeenCalledWith(23);
  });

  it('does not execute onChangeHandler when input is not a number..', async (): Promise<void> => {
    const onChangeSpy = jest.fn();

    render(
      <NumericalInput
        name='TestInput'
        value={ 2 }
        onChange={ onChangeSpy }
      />
    );

    const input = screen.getByDisplayValue('2');

    userEvent.type(input, 'a');

    expect(onChangeSpy).not.toHaveBeenCalled();
  });
});
