import React from 'react';
import './Headline.css';

export function Headline (props) {
  return (
    <h1 className='headline'>
      { props.content }
    </h1>
  );
}
