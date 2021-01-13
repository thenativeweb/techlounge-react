import React, { useState } from 'react';

export const TabController = ({ children }) => {
  const [ visibleTab, setVisibleTab ] = useState(0);

  const tabSelection = children.map((childElement, index) => {
    const key = `tab-${index}`;
    const content = index === visibleTab ?
      (<b>{childElement.props.headline}</b>) :
      (<em>{childElement.props.headline}</em>);

    return (
      <li key={ key }>
        <a href='#' onClick={ () => setVisibleTab(index) }>{content}</a>
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
