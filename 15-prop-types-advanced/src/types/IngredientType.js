import { UnitType } from './UnitType';
import PropTypes from 'prop-types';

const IngredientType = PropTypes.exact({
  name: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  unit: UnitType.isRequired
});

export { IngredientType };
