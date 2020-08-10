import React from 'react';
import { NameInput } from './formElements/NameInput';
import { TShirtSelect } from './formElements/TShirtSelect';
import { LunchCheckbox } from './formElements/LunchCheckbox';

const emptyForm = {
  formSubmitted: false,
  formComplete: false,
  name: '',
  tShirtSize: '',
  lunch: false
};

const isFormComplete = form => form.name;

export class RegisterForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = emptyForm;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit () {
    console.log(`Sending to an API: ${JSON.stringify(this.state)}`);

    this.setState({
      formSubmitted: true
    });
  }

  handleChange (event) {
    const formTargetName = event.target.name;
    const value = formTargetName === 'lunch' ? event.target.checked : event.target.value;

    this.setState(previousState => {
      const newState = {
        ...previousState,
        [formTargetName]: value
      };

      newState.formComplete = isFormComplete(newState);

      return newState;
    });
  }

  handleReset () {
    this.setState(emptyForm);
  }

  render () {
    if (this.state.formSubmitted) {
      return (
        <div>
          <p>Form erfolgreich versandt!</p>
          <button onClick={ this.handleReset }>
            Neues Formular ausfüllen
          </button>
        </div>
      );
    }

    return (
      <form onSubmit={ this.handleSubmit }>
        <NameInput value={ this.state.name } onChange={ this.handleChange } />
        <TShirtSelect value={ this.state.tShirtSize } onChange={ this.handleChange } />
        <LunchCheckbox value={ this.state.lunch } onChange={ this.handleChange } />
        <button onClick={ this.handleSubmit } disabled={ !this.state.formComplete }>Anmelden</button>
      </form>
    );
  }
}
