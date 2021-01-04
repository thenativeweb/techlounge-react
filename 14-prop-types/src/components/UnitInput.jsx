import PropTypes from 'prop-types';
import React from 'react';
import { UnitType } from '../types/UnitType';

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
  value: UnitType.isRequired,
  onChange: PropTypes.func.isRequired
};

export { UnitInput };
