import React from 'react';
import ReactDOM from 'react-dom';
import { Message } from './Message';

class App extends React.Component {
  render () {
    return (
      <div>
        <Message headline='Headline 1' text='Das ist die 1. Nachricht' />
        <Message headline='Headline 2' text='Das ist die 2. Nachricht' />
      </div>
    );
  }
}

const domTarget = document.querySelector('#my-react-app');

ReactDOM.render(<App />, domTarget);
