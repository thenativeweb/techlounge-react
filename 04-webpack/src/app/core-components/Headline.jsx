import React from 'react';
import './Headline.css';

export class Headline extends React.Component {
  render () {
    return (
      <h1 className='headline'> { this.props.content } </h1>
    );
  }
}
