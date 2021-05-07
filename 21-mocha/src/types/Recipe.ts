import { Ingredient } from './Ingredient';

interface Recipe {
  id: number | null;
  name: string;
  showEditForm: boolean;
  ingredients: Ingredient[];
}

export { Recipe };
