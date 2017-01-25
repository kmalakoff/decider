import React, {Component} from 'react';
import {observer} from 'mobx-react';
import CreateModal from './create-modal';

@observer
export default class Users extends Component {
  static contextTypes = {store: React.PropTypes.object.isRequired}

  render() {
    return (
      <div>
        <CreateModal/>
      </div>
    );
  }
};
