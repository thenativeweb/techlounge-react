import { Unit } from '../types/Unit';
import { FunctionComponent, ReactElement } from 'react';

interface UnitInputProps {
  value: Unit;
  onChange: (newUnit: Unit) => void;
}

const UnitInput: FunctionComponent<UnitInputProps> = ({ value, onChange }): ReactElement => (
  <select
    name='unit'
    value={ value }
    onChange={ (event): void => onChange(event.target.value as Unit) }
  >
    <option value='Stück'>Stück</option>
    <option value='Gramm'>Gramm</option>
    <option value='Liter'>Liter</option>
  </select>
);

export { UnitInput };
