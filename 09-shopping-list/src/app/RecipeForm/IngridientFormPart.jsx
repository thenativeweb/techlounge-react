import { NumericalInput } from '../../components/NumericalInput';
import React from 'react';

export class IngridientFormPart extends React.PureComponent {
  render () {
    const { ingridient, onChange } = this.props;

    return (
      <div className='ingridient-form'>
        <label> Zutat: <input
          type='text'
          value={ ingridient.name }
          name='name'
          onChange={ event => onChange(event, ingridient.name) }
                       />
        </label>
        <label> Menge: <NumericalInput
          value={ ingridient.amount }
          name='amount'
          onChange={ event => onChange(event, ingridient.name) }
                       />
        </label>
        <label>
          <select
            name='unit'
            value={ ingridient.unit }
            onChange={ event => onChange(event, ingridient.name) }
          >
            <option value='Stück'>Stück</option>
            <option value='Gramm'>Gramm</option>
            <option value='Liter'>Liter</option>
          </select>
        </label>
      </div>
    );
  }
}
