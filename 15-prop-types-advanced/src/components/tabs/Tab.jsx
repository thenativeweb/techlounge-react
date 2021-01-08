import PropTypes from 'prop-types';
import React from 'react';

const Tab = ({ headline, children }) => (
  <React.Fragment>
    <h1>{headline}</h1>
    {children}
  </React.Fragment>
);

Tab.propTypes = {
  children: PropTypes.node.isRequired,
  headline: PropTypes.string.isRequired
};

export { Tab };
