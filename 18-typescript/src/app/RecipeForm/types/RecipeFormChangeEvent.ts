import { ChangeEvent } from 'react';

type RecipeFormChangeEvent = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>, name: string) => void;

export { RecipeFormChangeEvent };
