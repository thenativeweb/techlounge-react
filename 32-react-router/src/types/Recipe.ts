import { Ingredient } from './Ingredient';

interface Recipe {
  id: number | null;
  name: string;
  ingredients: Ingredient[];
}

export { Recipe };
