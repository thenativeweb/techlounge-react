export function Headline (props) {
  const styles = {
    color: 'red'
  };

  return (
    <h1 style={ styles }>
      { props.content }
    </h1>
  );
}
