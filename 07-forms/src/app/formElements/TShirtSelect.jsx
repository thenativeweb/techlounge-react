/* eslint-disable react/jsx-child-element-spacing */
import React from 'react';

export class TShirtSelect extends React.Component {
  render () {
    return (
      <label> T-Shirt Größe:
        <select name='tShirtSize' value={ this.props.tShirtSize } onChange={ this.props.onChange }>
          <option value='w-s'>W-S</option>
          <option value='w-m'>W-M</option>
          <option value='w-l'>W-L</option>
          <option value='M-S'>M-S</option>
          <option value='M-M'>M-M</option>
          <option value='M-L'>M-L</option>
        </select>
      </label>
    );
  }
}
