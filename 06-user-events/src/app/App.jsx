import React from 'react';

import { Counter } from './Counter';
import { CounterPure } from './CounterPure';
import { CounterContainer } from './CounterContainer';

export class App extends React.Component {
  render () {
    return (
      <div>
        <h1>Basic Counter</h1>
        <Counter />
        <hr />
        <h1>Pure Counter</h1>
        <CounterPure />
        <hr />
        <h1>State-Uplifted Counter</h1>
        <CounterContainer />
      </div>
    );
  }
}
