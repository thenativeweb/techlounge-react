import React from 'react';
import './Paragraph.css';

export class Paragraph extends React.Component {
  render () {
    return (
      <p className='paragraph'>
        { this.props.text }
      </p>
    );
  }
}
