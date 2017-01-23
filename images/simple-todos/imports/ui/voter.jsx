import React, { Component } from 'react';

export default class Voter extends Component {
  static propTypes = { voter: React.PropTypes.object.isRequired };

  render() {
    return (
      <li>
        <span className="text">
          <strong>{this.props.voter.username}: </strong>
          <span>{`${this.props.voter.text}-${this.props.voter.completed_count}`}</span>
        </span>
      </li>
    );
  }
}
