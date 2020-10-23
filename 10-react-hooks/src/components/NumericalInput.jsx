import React from 'react';

const allowedInputRegex = /^\d*\.?\d*$/;

export class NumericalInput extends React.Component {
  constructor (props) {
    super(props);

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput (event) {
    const value = event.target.value;

    if (allowedInputRegex.test(value)) {
      this.props.onChange(event);
    }
  }

  render () {
    return (
      <input
        type='text'
        name={ this.props.name }
        value={ this.props.value }
        onChange={ this.handleInput }
      />
    );
  }
}
