import { ChangeEvent, Component, ReactElement } from 'react';

interface TypedClassComponentProps {
  name: string;
}

interface TypedClassComponentState {
  newName: string;
}

class TypedClassComponent extends Component<TypedClassComponentProps, TypedClassComponentState> {
  constructor (props: TypedClassComponentProps) {
    super(props);

    this.setState({
      newName: this.props.name
    });

    this.handleChange = this.handleChange.bind(this);
  }

  private handleChange (event: ChangeEvent<HTMLInputElement>): void {
    this.setState({
      newName: event.target.value
    });
  }

  public render (): ReactElement {
    return (
      <div>
        <input onChange={ this.handleChange } value={ this.state.newName }/>
        <p>{ this.props.name }</p>
      </div>
    );
  }
}

export { TypedClassComponent };
