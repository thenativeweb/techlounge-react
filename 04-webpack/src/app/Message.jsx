import React from 'react';
import { Headline } from './core-components/Headline';
import { Paragraph } from './core-components/Paragraph';

export class Message extends React.Component {
  render () {
    const headline = this.props.headline;
    const text = this.props.text;

    return (
      <div>
        <Headline content={ headline } />
        <Paragraph text={ text } />
      </div>
    );
  }
}
