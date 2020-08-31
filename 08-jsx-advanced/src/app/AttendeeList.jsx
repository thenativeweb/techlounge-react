import React from 'react';
export class AttendeeList extends React.Component {
  render () {
    const listElements = this.props.attendees.map(attendee => (
      <tr key={ attendee.id }>
        <td>{attendee.name}</td>
        <td>{attendee.tShirtSize}</td>
        <td><input type='checkbox' checked={ attendee.lunch } /></td>
      </tr>
    ));

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>T-Shirt Größe</th>
            <th>Mittagessen</th>
          </tr>
        </thead>
        <tbody>
          {listElements}
          <tr>
            <td><b>Gesamtteilnehmer:</b></td>
            <td />
            <td>{this.props.attendees.length}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}
