import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data'; 

import {Tasks} from '../api/tasks.js';
import Task from './Task.jsx';

class App extends Component {
  static propTypes = {tasks: React.PropTypes.array.isRequired};
 
  renderTasks() {
    let t = Tasks.find({}).fetch();
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>
 
        <ul>
          {this.renderTasks()}
        </ul>
        <button onClick={this.onCreateTodo}>create todo</button>
      </div>
    );
  }

  onCreateTodo = () => {
    Tasks.insert({voter_id: 10, text: 'created', createdAt: new Date()});
  }
}

export default createContainer(() => {
  return {tasks: Tasks.find({voter_id: 10}).fetch()};
}, App);
