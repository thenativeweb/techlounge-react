import { assert } from 'assertthat';
import { noop } from '../../fixtures/noop';
import sinon from 'sinon';
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

    assert.that(screen.getByDisplayValue('Liter')).is.not.null();
  });

  it('when new value is selected, calls callback with the newly selected value.', async (): Promise<void> => {
    const onChangeSpy = sinon.spy();

    render(
      <UnitInput
        value='Liter'
        onChange={ onChangeSpy }
      />
    );
    const selectBox = screen.getByDisplayValue('Liter');

    userEvent.selectOptions(selectBox, 'Stück');

    assert.that(onChangeSpy.calledOnce).is.true();
    assert.that(onChangeSpy.firstCall.firstArg).is.equalTo('Stück');
  });
});
