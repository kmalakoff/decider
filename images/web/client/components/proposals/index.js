import React, {Component} from 'react';
import {observer} from 'mobx-react';

@observer
export default class Proposals extends Component {
  static contextTypes = {store: React.PropTypes.object.isRequired}

  render() {
    const {store} = this.context;

    return (
      <h1>Proposals</h1>
    );
  }
};
