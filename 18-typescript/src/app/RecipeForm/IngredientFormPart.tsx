import { Ingredient } from '../../types/Ingredient';
import { NumericalInput } from '../../components/NumericalInput';
import { RecipeFormChangeEvent } from './types/RecipeFormChangeEvent';
import { UnitInput } from '../../components/UnitInput';
import { FunctionComponent, ReactElement, ReactEventHandler, SyntheticEvent } from 'react';

interface IngredientFormPartProps {
  ingredient: Ingredient;
  onChange: (event: RecipeFormChangeEvent, name: string) => void;
}

const IngredientFormPart: FunctionComponent<IngredientFormPartProps> = ({ ingredient, onChange }): ReactElement => (
  <div className='ingredient-form' >
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

export { IngredientFormPart };
