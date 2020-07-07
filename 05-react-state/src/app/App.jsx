import React from 'react';

import { ImageChanger } from './ImageChanger';

const images = [
  {
    src: 'https://images.freeimages.com/images/large-previews/105/100-natural-1384751.jpg',
    alt: 'Ein Tannenwald mit schneebedeckten Bergen im Hintergrund.'
  },
  {
    src: 'https://images.freeimages.com/images/large-previews/d24/desert-1393263.jpg',
    alt: 'Eine endlose, hügelige Sandwüste.'
  },
  {
    src: 'https://images.freeimages.com/images/large-previews/c6d/lake-reflection-1563165.jpg',
    alt: 'Ein See mit Bergen im Hintergrund, die sich im See spiegeln.'
  }
];

export class App extends React.Component {
  render () {
    return (
      <ImageChanger images={ images } intervalInMilliSeconds={ 3000 } />
    );
  }
}
