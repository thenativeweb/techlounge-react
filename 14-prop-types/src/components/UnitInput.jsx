import PropTypes from 'prop-types';
import React from 'react';

const UnitInput = ({ value, onChange }) => (
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

UnitInput.propTypes = {
  value: PropTypes.oneOf([ 'Stück', 'Gramm', 'Liter' ]).isRequired
};

export { UnitInput };
