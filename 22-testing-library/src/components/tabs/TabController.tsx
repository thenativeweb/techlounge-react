import { TabProps } from './Tab';
import React, { FunctionComponent, ReactElement, useState } from 'react';

interface TabControllerProps {
  children: ReactElement<TabProps>[];
}

const TabController: FunctionComponent<TabControllerProps> = ({ children }): ReactElement => {
  const [ visibleTab, setVisibleTab ] = useState(0);

  const tabSelection = children.map((childElement, index): ReactElement => {
    const key = `tab-${index}`;
    const content = index === visibleTab ?
      (<b>{childElement.props.headline}</b>) :
      (<em>{childElement.props.headline}</em>);

    return (
      <li key={ key }>
        <a href='#' onClick={ (): void => setVisibleTab(index) }>{content}</a>
      </li>
    );
  });

  return (
    <React.Fragment>
      <nav className='tabHeader'>
        <ul>
          {tabSelection}
        </ul>
      </nav>
      <article>
        {children[visibleTab]}
      </article>
    </React.Fragment>
  );
};

export { TabController };
