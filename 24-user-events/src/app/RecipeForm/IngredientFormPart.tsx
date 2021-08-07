import { Ingredient } from '../../types/Ingredient';
import { NumericalInput } from '../../components/NumericalInput';
import { RecipeFormChangeEvent } from './types/RecipeFormChangeEvent';
import { UnitInput } from '../../components/UnitInput';
import { FunctionComponent, ReactElement } from 'react';
import { noop } from '../../../fixtures/noop';

interface IngredientFormPartProps {
  ingredient: Ingredient;
  onChange: (event: RecipeFormChangeEvent, name: string) => void;
}

const IngredientFormPart: FunctionComponent<IngredientFormPartProps> = ({ ingredient, onChange }): ReactElement => (
  <div className='ingredient-form'>
    <label>Zutat:
      {' '}
      <input
        type='text'
        value={ ingredient.name }
        name='name'
        onChange={ (event): void => onChange(event, ingredient.name) }
      />
    </label>
    <label> Menge:
      <NumericalInput
        value={ ingredient.amount }
        name='amount'
        onChange={ noop }
      />
    </label>
    <label>
      <UnitInput
        value={ ingredient.unit }
        onChange={ (event): void => onChange(event, ingredient.name) }
      />
    </label>
  </div>
);

export { IngredientFormPart };
