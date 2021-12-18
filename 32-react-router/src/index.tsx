import { App } from './app/App';
import ReactDOM from 'react-dom';

import './styles.css';

const domTarget = document.querySelector('#my-react-app');

ReactDOM.render(<App />, domTarget);
