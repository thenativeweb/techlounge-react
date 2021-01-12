import { FunctionComponent, ReactElement, ReactEventHandler } from 'react';

const allowedInputRegex = /^\d*\.?\d*$/;

interface NumericalInputProps {
  name: string;
  value: number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const NumericalInput: FunctionComponent<NumericalInputProps> = ({ name, value, onChange }): ReactElement => {
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

export { NumericalInput };
