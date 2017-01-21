import React, {Component} from 'react';
 
// Task component - represents a single todo item
export default class Task extends Component {
  static propTypes = {task: React.PropTypes.object.isRequired};

  render() {
    return (
      <li>{this.props.task.text}</li>
    );
  }
}
