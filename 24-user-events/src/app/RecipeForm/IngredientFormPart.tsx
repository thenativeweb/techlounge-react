import { Ingredient } from '../../types/Ingredient';
import { NumericalInput } from '../../components/NumericalInput';
import { RecipeFormChangeEvent } from './types/RecipeFormChangeEvent';
import { UnitInput } from '../../components/UnitInput';
import { FunctionComponent, ReactElement } from 'react';

// Import './IngredientFormPart.css';

interface IngredientFormPartProps {
  ingredient: Ingredient;
  ingredientNumber: number;
  onChange: (event: RecipeFormChangeEvent, name: string) => void;
}

const IngredientFormPart: FunctionComponent<IngredientFormPartProps> = ({ ingredient, ingredientNumber, onChange }): ReactElement => (
  <div className='ingredient-form' role='group' aria-label={ `Zutat ${ingredientNumber}` }>
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
        onChange={ (value): void => onChange({ target: { value: value.toString() }} as RecipeFormChangeEvent, ingredient.name) }
      />
    </label>
    <label>
      <span className='visuallyhidden'>Mengeneinheit</span>
      <UnitInput
        value={ ingredient.unit }
        onChange={ (value): void => onChange({ target: { value }} as RecipeFormChangeEvent, ingredient.name) }
      />
    </label>
  </div>
);

export { IngredientFormPart };
