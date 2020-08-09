import React from 'react';

export class NameInput extends React.Component {
  render () {
    return (
      <label>
        Name: <input name='name' type='text' value={ this.props.name } onChange={ this.props.onChange } />
      </label>
    );
  }
}
