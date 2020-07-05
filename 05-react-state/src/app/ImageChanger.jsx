import React from 'react';

const getNextImageIndex = (images, imageIndex) => {
  if (imageIndex === images.length - 1) {
    return 0;
  }

  return imageIndex + 1;
};

export class ImageChanger extends React.Component {
  constructor (props) {
    super(props);
    this.state = { imageIndex: 0 };
  }

  componentDidMount () {
    this.intervalId = setInterval(
      () => this.changeImage(),
      this.props.intervalInMilliSeconds
    );
  }

  componentWillUnmount () {
    clearInterval(this.intervalId);
  }

  changeImage () {
    this.setState(previousState => ({
      imageIndex: getNextImageIndex(this.props.images, previousState.imageIndex)
    }));
  }

  render () {
    const currentImage = this.props.images[this.state.imageIndex];

    return (
      <div>
        <img src={ currentImage.src } alt={ currentImage.alt } />
      </div>
    );
  }
}
