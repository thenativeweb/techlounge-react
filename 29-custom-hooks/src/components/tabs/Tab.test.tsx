import { assert } from 'assertthat';
import { Tab } from './Tab';
import { TabController } from '.';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

describe('Tab', (): void => {
  it('renders the given headlines as tab-elements.', async (): Promise<void> => {
    render(
      <TabController>
        <Tab headline='Tab 1'>Tab 1</Tab>
        <Tab headline='Tab 2'>Tab 2</Tab>
      </TabController>
    );

    assert.that(screen.getByRole('tab', { name: 'Tab 1' })).is.not.null();
    assert.that(screen.getByRole('tab', { name: 'Tab 2' })).is.not.null();
  });

  it('renders the first given panel by default.', async (): Promise<void> => {
    render(
      <TabController>
        <Tab headline='Tab 1'>Content 1</Tab>
        <Tab headline='Tab 2'>Content 2</Tab>
      </TabController>
    );

    assert.that(screen.getByRole('tabpanel', { name: 'Tab 1' })).is.not.null();
    assert.that(screen.getByText('Content 1')).is.not.null();
    assert.that(screen.queryByRole('tabpanel', { name: 'Tab 2' })).is.null();
  });

  it('renders the second panel on click on tab element.', async (): Promise<void> => {
    render(
      <TabController>
        <Tab headline='Tab 1'>Content 1</Tab>
        <Tab headline='Tab 2'>Content 2</Tab>
      </TabController>
    );

    userEvent.click(screen.getByRole('tab', { name: 'Tab 2' }));

    // Da wir einen State Change haben der asynchron läuft müssen wir mit findBy warten.
    const tabPanel2 = await screen.findByRole('tabpanel', { name: 'Tab 2' });

    assert.that(tabPanel2).is.not.null();
    assert.that(screen.getByText('Content 2')).is.not.null();
  });
});
