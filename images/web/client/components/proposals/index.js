import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Button, Checkbox, Form, Input, Radio, Select, TextArea} from 'semantic-ui-react';
import CreateModal from './create-modal';

@observer
export default class Proposals extends Component {
  static contextTypes = {store: React.PropTypes.object.isRequired}

  render() {
    return (
      <div>
        <CreateModal/>
      </div>
    );
  }
};
