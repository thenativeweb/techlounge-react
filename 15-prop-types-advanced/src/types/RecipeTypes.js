import { IngredientType } from './IngredientType';
import PropTypes from 'prop-types';

const RecipeType = PropTypes.exact({
  id: PropTypes.number.isRequired,
  ingredients: PropTypes.arrayOf(IngredientType),
  name: PropTypes.string.isRequired,
  showEditForm: PropTypes.bool.isRequired
});

export { RecipeType };
