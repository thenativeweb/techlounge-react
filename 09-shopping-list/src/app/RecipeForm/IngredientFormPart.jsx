import { NumericalInput } from '../../components/NumericalInput';
import React from 'react';

export class IngredientFormPart extends React.PureComponent {
  render () {
    const { ingredient, onChange } = this.props;

    return (
      <div className='ingredient-form'>
        <label> Zutat: <input
          type='text'
          value={ ingredient.name }
          name='name'
          onChange={ event => onChange(event, ingredient.name) }
                       />
        </label>
        <label> Menge: <NumericalInput
          value={ ingredient.amount }
          name='amount'
          onChange={ event => onChange(event, ingredient.name) }
                       />
        </label>
        <label>
          <select
            name='unit'
            value={ ingredient.unit }
            onChange={ event => onChange(event, ingredient.name) }
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
