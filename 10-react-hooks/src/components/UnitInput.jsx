import React from 'react';

export const UnitInput = ({ value, onChange }) => (
  <select
    name='unit'
    value={ value }
    onChange={ onChange }
  >
    <option value='Stück'>Stück</option>
    <option value='Gramm'>Gramm</option>
    <option value='Liter'>Liter</option>
  </select>
);
