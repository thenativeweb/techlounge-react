import { assert } from 'assertthat';
import { ComponentToggle } from './ComponentToggle';
import { ReactElement } from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

describe('ComponentToggle', (): void => {
  it('renders the trigger component.', async (): Promise<void> => {
    render(
      <ComponentToggle
        TriggerComponent={ (props): ReactElement => <button { ...props }>Trigger</button> }
        closedElement={ <h1>Closed</h1> }
        openedElement={ <h1>Opened</h1> }
      />
    );

    assert.that(screen.getByText('Trigger')).is.not.null();
  });

  it('renders the closedElement on default.', async (): Promise<void> => {
    render(
      <ComponentToggle
        TriggerComponent={ (props): ReactElement => <button { ...props }>Trigger</button> }
        closedElement={ <h1>Closed</h1> }
        openedElement={ <h1>Opened</h1> }
      />
    );

    assert.that(screen.getByText('Closed')).is.not.null();
  });

  it('renders the openedElement on first click on trigger.', async (): Promise<void> => {
    render(
      <ComponentToggle
        TriggerComponent={ (props): ReactElement => <button { ...props }>Trigger</button> }
        closedElement={ <h1>Closed</h1> }
        openedElement={ <h1>Opened</h1> }
      />
    );

    userEvent.click(screen.getByText('Trigger'));

    assert.that(screen.getByText('Opened')).is.not.null();
  });

  it('renderes the closedElement when clicked again.', async (): Promise<void> => {
    render(
      <ComponentToggle
        TriggerComponent={ (props): ReactElement => <button { ...props }>Trigger</button> }
        closedElement={ <h1>Closed</h1> }
        openedElement={ <h1>Opened</h1> }
      />
    );

    const triggerButton = screen.getByText('Trigger');

    userEvent.click(triggerButton);
    userEvent.click(triggerButton);

    assert.that(screen.getByText('Closed')).is.not.null();
    assert.that(screen.queryByText('Opened')).is.null();
  });

  it('given a Component as closedElement, passes a toggle function to open the toggle.', async (): Promise<void> => {
    render(
      <ComponentToggle
        TriggerComponent={ (props): ReactElement => <button { ...props }>Trigger</button> }
        closedElement={ (props): ReactElement => <button onClick={ (): void => props.toggle() }>Closed</button> }
        openedElement={ <h1>Opened</h1> }
      />
    );

    userEvent.click(screen.getByText('Closed'));

    assert.that(screen.getByText('Opened')).is.not.null();
  });

  it('given a Component as openedElement, passes a toggle function to close the toggle.', async (): Promise<void> => {
    render(
      <ComponentToggle
        TriggerComponent={ (props): ReactElement => <button { ...props }>Trigger</button> }
        closedElement={ <h1>Closed</h1> }
        openedElement={ (props): ReactElement => <button onClick={ (): void => props.toggle() }>Opened</button> }
      />
    );

    userEvent.click(screen.getByText('Trigger'));
    userEvent.click(screen.getByText('Opened'));

    assert.that(screen.getByText('Closed')).is.not.null();
  });
});
