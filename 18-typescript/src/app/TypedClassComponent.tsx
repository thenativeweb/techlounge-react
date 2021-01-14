import React from 'react';

interface TypedClassComponentProps {
  name: string;
}

interface TypedClassComponentState {
  newName: string;
}

class TypedClassComponent extends React.Component<TypedClassComponentProps, TypedClassComponentState> {
  constructor (props: TypedClassComponentProps) {
    super(props);

    this.setState({
      newName: this.props.name
    });

    this.handleChange = this.handleChange.bind(this);
  }

  private handleChange (event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      newName: event.target.value
    });
  }

  public render () {
    return (
      <div>
        <input onChange={ this.handleChange } value={ this.state.newName }/>
        <p>{ this.props.name }</p>
      </div>
    );
  }
}

export { TypedClassComponent };
