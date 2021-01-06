import React from 'react';

const allowedInputRegex = /^\d*\.?\d*$/;

export const NumericalInput = ({ name, value, onChange }) => {
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
