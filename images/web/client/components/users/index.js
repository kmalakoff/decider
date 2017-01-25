import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Button, Checkbox, Form, Input, Radio, Select, TextArea} from 'semantic-ui-react';

@observer
export default class Users extends Component {
  static contextTypes = {store: React.PropTypes.object.isRequired}

  onSave = (e) => { e.preventDefault(); }

  render() {
    return (
      <Form>
        <Form.Group widths='equal'>
          <Form.Field control={Input} label='First' placeholder='First' />
          <Form.Field control={Input} label='Last' placeholder='Last' />
          <Form.Field control={Input} label='Email' placeholder='your@email.com' />
        </Form.Group>
        <Form.Field control={Button} onClick={this.onSave}>Create</Form.Field>
      </Form>
    );
  }
};
