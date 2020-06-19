import { App } from './App/App';
import ReactDOM from 'react-dom';
import React from 'react';

import './styles.css';

const domTarget = document.querySelector('#my-react-app');

ReactDOM.render(<App />, domTarget);
