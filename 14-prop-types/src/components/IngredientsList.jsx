import PropTypes from 'prop-types';
import React from 'react';
import { IngredientType } from '../types/IngredientType';

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
  items: PropTypes.arrayOf(IngredientType).isRequired
};

export { IngredientsList };
