import React from 'react';

export class MutabilityErrorExample extends React.Component {
  render () {
    const baseArray = [ 'a', 'b', 'c' ];

    return (
      <div>
        <h3>Shortened Array</h3>
        <ShortenedArrayShower array={ baseArray } />
        <h3>Full Array</h3>
        <FullArrayShower array={ baseArray } />
      </div>

    );
  }
}

export class ShortenedArrayShower extends React.Component {
  constructor (props) {
    super(props);
    props.array.pop();
  }

  render () {
    return (
      <ul>
        <li>{ this.props.array[0] }</li>
        <li>{ this.props.array[1] }</li>
      </ul>
    );
  }
}

export class FullArrayShower extends React.Component {
  render () {
    return (
      <ul>
        <li>{ this.props.array[0] }</li>
        <li>{ this.props.array[1] }</li>
        <li>{ this.props.array[2] }</li>
      </ul>
    );
  }
}
