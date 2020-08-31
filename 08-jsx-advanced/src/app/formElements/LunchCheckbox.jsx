import React from 'react';

export class LunchCheckbox extends React.Component {
  render () {
    return (
      <label>
        Ich bleibe zum Mittagessen: <input name='lunch' type='checkbox' checked={ this.props.lunch } onChange={ this.props.onChange } />
      </label>
    );
  }
}
