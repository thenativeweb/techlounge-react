import React from 'react';
import { Message } from './Message';

export class App extends React.Component {
  render () {
    return (
      <div>
        <Message headline='Headline 1' text='Das ist die 1. Nachricht' />
        <Message headline='Headline 2' text='Das ist die 2. Nachricht' />
        <Message headline='Headline 3' text='Das ist die 3. Nachricht' />
      </div>
    );
  }
}
