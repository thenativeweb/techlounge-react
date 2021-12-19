import ReactDOM from 'react-dom';
import { ShoppingList } from './app/ShoppingList';

import './styles.css';

const domTarget = document.querySelector('#my-react-app');

ReactDOM.render(<ShoppingList />, domTarget);
