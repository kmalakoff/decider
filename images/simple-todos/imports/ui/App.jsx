import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data'; 

import Voters from '../api/voters.js';
import Voter from './voter.jsx';

class App extends Component {
  static propTypes = {
    loading: React.PropTypes.bool.isRequired,
    voters: React.PropTypes.array.isRequired
  };
  
  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>
 
        <ul>
          {this.props.voters.map((voter) => <Voter key={voter._id} voter={voter} />)}
        </ul>
        <div>{this.props.loading ? 'loading' : 'loaded'}</div>
        <button onClick={this.onCreateTodo}>create todo</button>
      </div>
    );
  }

  onCreateTodo = () => {
    Voters.insert({created_at: new Date(), voter_id: 100, text: 'created', completed_count: 0});
  }
}

export default createContainer(() => {
  const subscription = Meteor.subscribe('voters.list');
  const loading = !subscription.ready();
  const voters = Voters.find().fetch();
  return {loading, voters};
}, App);
