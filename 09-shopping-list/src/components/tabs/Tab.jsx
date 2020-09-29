import React from 'react';

export class Tab extends React.Component {
  render () {
    return (
      <React.Fragment>
        <h1>{this.props.headline}</h1>
        {this.props.children}
      </React.Fragment>
    );
  }
}
