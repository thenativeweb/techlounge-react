import React from 'react';

export class CounterPure extends React.PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      counterValue: 0
    };
  }

  handleClick () {
    this.setState(state => ({
      counterValue: state.counterValue + 1
    }));
  }

  render () {
    return (
      <div>
        <h3>Counter Pure is: {this.state.counterValue}</h3>
        <button onClick={ () => this.handleClick() }>Increment</button>
      </div>
    );
  }
}
