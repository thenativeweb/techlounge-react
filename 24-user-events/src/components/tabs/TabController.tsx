import { TabProps } from './Tab';
import React, { FunctionComponent, ReactElement, useState } from 'react';

interface TabControllerProps {
  children: ReactElement<TabProps>[];
}

const TabController: FunctionComponent<TabControllerProps> = ({ children }): ReactElement => {
  const [ visibleTab, setVisibleTab ] = useState(0);

  const tabSelection = children.map((childElement, index): ReactElement => {
    const key = `tab-${index}`;
    const isVisibleTab = index === visibleTab;
    const content = isVisibleTab ?
      (<b>{childElement.props.headline}</b>) :
      (<em>{childElement.props.headline}</em>);

    return (
      <li key={ key }>
        <a
          role='tab'
          aria-selected={ isVisibleTab }
          id={ key }
          href='#' onClick={ (): void => setVisibleTab(index) }
        >
          {content}
        </a>
      </li>
    );
  });

  return (
    <React.Fragment>
      <nav className='tabHeader'>
        <ul role='tablist' aria-label='Tabauswahl'>
          {tabSelection}
        </ul>
      </nav>
      <article role='tabpanel' tabIndex={ visibleTab } aria-labelledby={ `tab-${visibleTab}` }>
        {children[visibleTab]}
      </article>
    </React.Fragment>
  );
};

export { TabController };
