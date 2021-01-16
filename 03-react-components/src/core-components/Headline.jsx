export class Headline extends React.Component {
  render () {
    const styles = {
      color: 'red'
    };

    return (
    <h1 style={ styles }> { this.props.content } </h1>
    );
  }
}
