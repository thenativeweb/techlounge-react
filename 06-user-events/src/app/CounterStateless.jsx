import React from 'react';

export class CounterStateless extends React.PureComponent {
  handleClick () {
    this.props.incrementCounter();
  }

  render () {
    return (
      <div>
        <h3>Counter Stateless is: {this.props.counterValue}</h3>
        <button onClick={ () => this.handleClick() }>Increment</button>
      </div>
    );
  }
}
