import { FunctionComponent, ReactElement } from 'react';
import { Ingredient } from '../types/Ingredient';

interface IngredientsListProps {
  items: Ingredient[];
}

const IngredientsList: FunctionComponent<IngredientsListProps> = ({ items }): ReactElement => {
  const listElements = items.map(item => (
    <li key={ `${item.name}-item` }>{item.amount} {item.unit} {item.name} </li>
  ));

  return (
    <ul>
      {listElements}
    </ul>
  );
};

export { IngredientsList };
