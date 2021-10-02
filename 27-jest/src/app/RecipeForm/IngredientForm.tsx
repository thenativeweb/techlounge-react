import { Ingredient } from '../../types/Ingredient';
import { NumericalInput } from '../../components/NumericalInput';
import { UnitInput } from '../../components/UnitInput';
import { FunctionComponent, ReactElement } from 'react';

interface IngredientFormProps {
  ingredient: Ingredient;
  ingredientNumber: number;
  onChange: (changedIngredient: Ingredient, ingredientNumber: number) => void;
}

const IngredientFormPart: FunctionComponent<IngredientFormProps> = ({ ingredient, ingredientNumber, onChange }): ReactElement => (
  <div className='ingredient-form' role='group' aria-label={ `Zutat ${ingredientNumber}` }>
    <label>Zutat:
      {' '}
      <input
        type='text'
        value={ ingredient.name }
        name='name'
        onChange={ (event): void => onChange({
          ...ingredient,
          name: event.target.value
        }, ingredientNumber) }
      />
    </label>
    <label> Menge:
      <NumericalInput
        value={ ingredient.amount }
        name='amount'
        onChange={ (value): void => onChange({
          ...ingredient,
          amount: value
        }, ingredientNumber) }
      />
    </label>
    <label>
      <span className='visuallyhidden'>Mengeneinheit</span>
      <UnitInput
        value={ ingredient.unit }
        onChange={ (value): void => onChange({
          ...ingredient,
          unit: value
        }, ingredientNumber) }
      />
    </label>
  </div>
);

export { IngredientFormPart };
