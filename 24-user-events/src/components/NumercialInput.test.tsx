import { assert } from 'assertthat';
import { noop } from '../../fixtures/noop';
import { NumericalInput } from './NumericalInput';
import sinon from 'sinon';
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

    assert.that(screen.getByDisplayValue('2')).is.not.null();
  });

  it('it executes onChangeHandler  with the typed value as number.', async (): Promise<void> => {
    const onChangeSpy = sinon.spy();

    render(
      <NumericalInput
        name='TestInput'
        value={ 2 }
        onChange={ onChangeSpy }
      />
    );

    const input = screen.getByDisplayValue('2');

    userEvent.type(input, '3');

    assert.that(onChangeSpy.calledOnce).is.true();
    assert.that(onChangeSpy.firstCall.firstArg).is.equalTo(23);
  });

  it('does not execute onChangeHandler when input is not a number..', async (): Promise<void> => {
    const onChangeSpy = sinon.spy();

    render(
      <NumericalInput
        name='TestInput'
        value={ 2 }
        onChange={ onChangeSpy }
      />
    );

    const input = screen.getByDisplayValue('2');

    userEvent.type(input, 'a');

    assert.that(onChangeSpy.calledOnce).is.false();
  });
});
