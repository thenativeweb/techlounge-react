export class Paragraph extends React.Component {
  render () {
    return (
      <p className='paragraph'>
        {this.props.text}
      </p>
    );
  }
}
