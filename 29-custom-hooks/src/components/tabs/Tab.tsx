import React, { FunctionComponent, ReactElement, ReactNode } from 'react';

interface TabProps {
  headline: string;
  children?: ReactNode;
}

const Tab: FunctionComponent<TabProps> = ({ headline, children }): ReactElement => (
  <React.Fragment>
    <h1>{headline}</h1>
    {children}
  </React.Fragment>
);

export { Tab, TabProps };
