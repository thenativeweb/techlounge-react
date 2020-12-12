import React from 'react';

export const IngredientsList = ({ items }) => {
  const listElements = items.map(item => (
    <li key={ `${item.name}-item` }>{item.amount} {item.unit} {item.name} </li>
  ));

  return (
    <ul>
      {listElements}
    </ul>
  );
};
