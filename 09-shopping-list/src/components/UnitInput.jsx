import React from 'react';

export class UnitInput extends React.Component {
  render () {
    return (
      <select
        name='unit'
        value={ this.props.value }
        onChange={ this.props.onChange }
      >
        <option value='Stück'>Stück</option>
        <option value='Gramm'>Gramm</option>
        <option value='Liter'>Liter</option>
      </select>
    );
  }
}
