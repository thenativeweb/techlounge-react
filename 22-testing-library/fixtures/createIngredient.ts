import { Ingredient } from '../src/types/Ingredient';

const defaultIngredient: Ingredient = {
  amount: 100,
  name: 'TestIngredient',
  unit: 'Liter'
};

const createIngredient = (props: Partial<Ingredient> = {}): Ingredient => ({ ...defaultIngredient, ...props });

export {
  createIngredient
};
