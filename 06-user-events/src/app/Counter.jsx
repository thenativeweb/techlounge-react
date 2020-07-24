import React from 'react';

export class Counter extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      counterValue: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    this.setState(state => {
      state.counterValue++;

      return state;
    });
  }

  render () {
    return (
      <div>
        <h3>Counter is: {this.state.counterValue}</h3>
        <button onClick={ this.handleClick }>Increment</button>
      </div>
    );
  }
}
