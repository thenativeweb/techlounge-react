import PropTypes from 'prop-types';
import React from 'react';

const allowedInputRegex = /^\d*\.?\d*$/;

const NumericalInput = ({ name, value, onChange }) => {
  const handleInput = event => {
    const newValue = event.target.value;

    if (allowedInputRegex.test(newValue)) {
      onChange(event);
    }
  };

  return (
    <input
      type='text'
      name={ name }
      value={ value }
      onChange={ handleInput }
    />
  );
};

NumericalInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  onChange: PropTypes.func.isRequired
};

export { NumericalInput };
