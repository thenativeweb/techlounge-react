import React from 'react';

import { CounterStateless } from './CounterStateless';
import { ResetCounter } from './ResetCounters';
export class CounterContainer extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      counterValue: 0
    };
  }

  incrementCounter () {
    this.setState(state => ({
      counterValue: state.counterValue + 1
    }));
  }

  resetToZero () {
    this.setState({
      counterValue: 0
    });
  }

  render () {
    return (
      <div>
        <CounterStateless counterValue={ this.state.counterValue } incrementCounter={ () => this.incrementCounter() } />
        <ResetCounter counterValue={ this.state.counterValue } resetToZero={ () => this.resetToZero() } />
      </div>
    );
  }
}
