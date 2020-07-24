import React from 'react';

export class ResetCounter extends React.PureComponent {
  onClick () {
    this.props.resetToZero();
  }

  render () {
    const disabled = this.props.counterValue === 0;

    return (
      <button onClick={ () => this.onClick() } disabled={ disabled }>Reset auf 0</button>
    );
  }
}
