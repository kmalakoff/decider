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
              <Form.Field control={Input} label='Name' name='Name' placeholder='Name' />
            </Form.Group>
            <Form.Field control={Button}>Create</Form.Field>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }  
}
