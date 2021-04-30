import { Unit } from '../types/Unit';
import { ChangeEventHandler, FunctionComponent, ReactElement } from 'react';

interface UnitInputProps {
  value: Unit;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

const UnitInput: FunctionComponent<UnitInputProps> = ({ value, onChange }): ReactElement => (
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

export { UnitInput };
