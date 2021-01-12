import { Fragment } from 'react';

export const Tab = ({ headline, children }) => (
  <Fragment>
    <h1>{headline}</h1>
    {children}
  </Fragment>
);
