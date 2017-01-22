import React, {Component} from 'react';
 
export default class Voter extends Component {
  static propTypes = {voter: React.PropTypes.object.isRequired};

  render() {
    return (
      <li>{this.props.voter.text}</li>
    );
  }
}
