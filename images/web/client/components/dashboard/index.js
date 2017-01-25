import React, {Component} from 'react';
import {observer} from 'mobx-react';

@observer
export default class Dashboard extends Component {
  static contextTypes = {store: React.PropTypes.object.isRequired}

  render() {
    const {store} = this.context;

    return (
      <h1>Landing</h1>
    );
  }
};
