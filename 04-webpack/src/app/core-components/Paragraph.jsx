import React from 'react';
import './Paragraph.css';

export function Paragraph (props) {
  return (
      <p className='paragraph'> { props.text } </p>
  );
}
