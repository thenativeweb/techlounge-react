import React from 'react';

export class IngredientsList extends React.Component {
  render () {
    const listElements = this.props.items.map(item => (
      <li key={ `${item.name}-item` }>{item.amount} {item.unit} {item.name} </li>
    ));

    return (
      <ul>
        {listElements}
      </ul>
    );
  }
}
