import React from 'react';

import { RegisterForm } from './RegisterForm';
import { AttendeeList } from './AttendeeList';
import { Tab } from './tabs/Tab';
import { TabController } from './tabs/TabController';

const mockAttendees = [
  {
    id: 1,
    name: 'Diana Prince',
    tShirtSize: 'W-M',
    lunch: true
  },
  {
    id: 2,
    name: 'Bruce Wayne',
    tShirtSize: 'M-L',
    lunch: true
  },
  {
    id: 3,
    name: 'Selina Kyle',
    tShirtSize: 'W-L',
    lunch: false
  }
];

export class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      attendees: mockAttendees
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (newAttendee) {
    this.setState(prevState => ({
      attendees: [
        ...prevState.attendees,
        newAttendee
      ]
    }));
  }

  render () {
    return (
      <TabController>
        <Tab headline='Registrierung'>
          <RegisterForm onSubmit={ this.handleSubmit } />
        </Tab>
        <Tab headline='Teilnehmerliste'>
          <AttendeeList attendees={ this.state.attendees } />
        </Tab>
      </TabController>
    );
  }
}
