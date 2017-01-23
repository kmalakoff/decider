import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Voters from '../api/voters.js';
import Voter from './voter.jsx';

import AccountsUIWrapper from './accounts_ui_wrapper.jsx';

class App extends Component {
  static propTypes = {
    loading: React.PropTypes.bool.isRequired,
    voters: React.PropTypes.array.isRequired
  };

  render() {
    return (
      <div className="container">
        <AccountsUIWrapper />
        <header>
          <h1>Todo List</h1>
        </header>

        <ul>
          {this.props.voters.map((voter) => <Voter key={voter._id} voter={voter} />)}
        </ul>
        <div>{this.props.loading ? 'loading' : 'loaded'}</div>
        {this.props.user ? <button onClick={this.onCreateTodo}>create todo</button> : ''}
      </div>
    );
  }

  onCreateTodo = () => {
    try { Meteor.call('voters.insert', 'created text'); }
    catch (err) { alert(err); }
  }
}

export default createContainer(() => {
  const subscription = Meteor.subscribe('voters.list');
  return {
    loading: !subscription.ready(),
    voters: Voters.find().fetch(),
    user: Meteor.user(),
  };
}, App);
