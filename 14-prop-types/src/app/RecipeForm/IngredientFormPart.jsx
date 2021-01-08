import { NumericalInput } from '../../components/NumericalInput';
import PropTypes from 'prop-types';
import React from 'react';
import { UnitInput } from '../../components/UnitInput';

const IngredientFormPart = ({ ingredient, onChange }) => (
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
      <UnitInput
        value={ ingredient.unit }
        onChange={ event => onChange(event, ingredient.name) }
      />
    </label>
  </div>
);

IngredientFormPart.propTypes = {
  ingredient: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export { IngredientFormPart };
