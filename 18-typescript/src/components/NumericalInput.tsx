import { ChangeEventHandler, FunctionComponent, ReactElement } from 'react';

const allowedInputRegex = /^\d*\.?\d*$/;

interface NumericalInputProps {
  name: string;
  value: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const NumericalInput: FunctionComponent<NumericalInputProps> = ({ name, value, onChange }): ReactElement => {
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
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
