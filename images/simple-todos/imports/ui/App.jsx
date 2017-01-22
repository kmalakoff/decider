import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data'; 

import {Voters} from '../api/voters.js';
import Voter from './voter.jsx';

class App extends Component {
  static propTypes = {voters: React.PropTypes.array.isRequired};
 
  renderVoters() {
    let t = Voters.find({}).fetch();
    return this.props.voters.map((voter) => (
      <Voter key={voter._id} voter={voter} />
    ));
  }
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>
 
        <ul>
          {this.renderVoters()}
        </ul>
        <button onClick={this.onCreateTodo}>create todo</button>
      </div>
    );
  }

  onCreateTodo = () => {
    Voters.insert({voter_id: 10, text: 'created', createdAt: new Date()});
  }
}

export default createContainer(() => {
  return {voters: Voters.find({voter_id: 10}).fetch()};
}, App);
