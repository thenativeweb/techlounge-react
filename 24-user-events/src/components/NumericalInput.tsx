import { ChangeEvent, FunctionComponent, ReactElement } from 'react';

const allowedInputRegex = /^\d*\.?\d*$/u;

interface NumericalInputProps {
  name: string;
  value: number;
  onChange: (newValue: number) => void;
}

const NumericalInput: FunctionComponent<NumericalInputProps> = ({ name, value, onChange }): ReactElement => {
  const handleInput = (event: ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;

    if (allowedInputRegex.test(newValue)) {
      onChange(Number(event.target.value));
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
