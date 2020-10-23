import React from 'react';

export const Tab = ({ headline, children }) => (
  <React.Fragment>
    <h1>{headline}</h1>
    {children}
  </React.Fragment>
);
