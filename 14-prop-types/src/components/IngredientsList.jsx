import PropTypes from 'prop-types';
import React from 'react';

const IngredientsList = ({ items }) => {
  const listElements = items.map(item => (
    <li key={ `${item.name}-item` }>{item.amount} {item.unit} {item.name} </li>
  ));

  return (
    <ul>
      {listElements}
    </ul>
  );
};

IngredientsList.propTypes = {
  items: PropTypes.array.isRequired
};

export { IngredientsList };
