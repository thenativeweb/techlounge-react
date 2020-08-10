import React from 'react';

export class NameInput extends React.Component {
  render () {
    return (
      <label htmlFor='name'>
        Name: <input id='name' name='name' type='text' value={ this.props.name } onChange={ this.props.onChange } />
      </label>
    );
  }
}
