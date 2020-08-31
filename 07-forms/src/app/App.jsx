import React from 'react';

import { RegisterForm } from './RegisterForm';
import { AttendeeList } from './AttendeeList';
export class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      attendees: [
        {
          name: 'Wonder Woman',
          tShirtSize: 'W-M',
          lunch: true
        },
        {
          name: 'Bat Man',
          tShirtSize: 'M-L',
          lunch: true
        },
        {
          name: 'Bat Man',
          tShirtSize: 'M-L',
          lunch: true
        }

      ]
    };
  }

  render () {
    return (
      <div>
        <h1>Registrierung React-Workshop</h1>
        <RegisterForm />
        <h1>Bereits registriert:</h1>
        <AttendeeList attendees={ this.state.attendees } />
      </div>
    );
  }
}
