import React from 'react';

const allowedInputRegex = /^\d*\.?\d*$/;

const causeForSlowRender = () => new Array(30000000).fill('Unnecessary command');

export const NumericalInput = ({ name, value, onChange }) => {
  const handleInput = event => {
    const newValue = event.target.value;

    if (allowedInputRegex.test(newValue)) {
      onChange(event);
    }
  };

  causeForSlowRender();

  return (
    <input
      type='text'
      name={ name }
      value={ value }
      onChange={ handleInput }
    />
  );
};
