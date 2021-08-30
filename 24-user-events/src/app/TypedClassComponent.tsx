import { ChangeEvent, Component, ReactElement } from 'react';

interface TypedClassComponentProps {
  name: string;
}

interface TypedClassComponentState {
  newName: string;
}

class TypedClassComponent extends Component<TypedClassComponentProps, TypedClassComponentState> {
  public constructor (props: TypedClassComponentProps) {
    super(props);

    this.setState({
      newName: props.name
    });

    this.handleChange = this.handleChange.bind(this);
  }

  private handleChange (event: ChangeEvent<HTMLInputElement>): void {
    this.setState({
      newName: event.target.value
    });
  }

  public render (): ReactElement {
    const { newName } = this.state;
    const { name } = this.props;

    return (
      <div>
        <input onChange={ this.handleChange } value={ newName } />
        <p>{ name }</p>
      </div>
    );
  }
}

export { TypedClassComponent };
