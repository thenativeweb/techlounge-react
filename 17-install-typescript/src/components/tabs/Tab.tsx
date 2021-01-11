import { Fragment } from 'react';

export const Tab = ({ headline, children }: { headline: string; children?: any}) => (
  <Fragment>
    <h1>{headline}</h1>
    {children}
  </Fragment>
);
