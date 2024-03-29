import { Ingredient } from '../types/Ingredient';
import { FunctionComponent, ReactElement } from 'react';

interface IngredientsListProps {
  items: Ingredient[];
}

const IngredientsList: FunctionComponent<IngredientsListProps> = ({ items }): ReactElement => {
  const listElements = items.map((item): ReactElement => (
    <li key={ `${item.name}-item` }>{item.amount} {item.unit} {item.name} </li>
  ));

  return (
    <ul aria-label='Zutaten'>
      {listElements}
    </ul>
  );
};

export { IngredientsList };
