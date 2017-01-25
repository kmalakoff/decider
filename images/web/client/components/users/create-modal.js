import React, {Component} from 'react';
import {Button, Header, Image, Modal, Form, Input} from 'semantic-ui-react'

export default class CreateModal extends Component {
  onSave = (e, {formData}) => { e.preventDefault(); }

  render() {
    return (
      <Modal size='small' trigger={<Button>Create</Button>}>
        <Modal.Header>New Proposal</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.onSave}>
            <Form.Group widths='equal'>
              <Form.Field control={Input} label='First' name='First' placeholder='First' />
              <Form.Field control={Input} label='Last' name='Last' placeholder='Last' />
              <Form.Field control={Input} label='Email' name='Email' placeholder='your@email.com' />
            </Form.Group>
            <Form.Field control={Button}>Create</Form.Field>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }  
}
