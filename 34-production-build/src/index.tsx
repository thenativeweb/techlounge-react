import { App } from './app/App';
import ReactDOM from 'react-dom';

import './styles.css';

if (!PRODUCTION) {
  // eslint-disable-next-line no-console
  console.log('Running in Dev Mode');
}

const domTarget = document.querySelector('#my-react-app');

ReactDOM.render(<App />, domTarget);
