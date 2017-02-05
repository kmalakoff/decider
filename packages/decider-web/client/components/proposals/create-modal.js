import React, {Component} from 'react';
import {Button, Header, Image, Modal, Form, Input} from 'semantic-ui-react'

import cx from 'classnames';
import reformed from 'react-reformed';
import compose from 'react-reformed/lib/compose';
import validateSchema from 'react-reformed/lib/validateSchema';

class CreateModal extends Component {
  state = { modalOpen: false }
  handleOpen = (e) => this.setState({modalOpen: true})
  handleClose = (e) => this.setState({modalOpen: false})

  onSave = (e, {formData}) => {
    e.preventDefault();

    (async () => {
      try {
        let res = await fetch(`${process.env.API_SERVICE_URL}/commands/v1/proposals`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(formData)
        });
        const json = await res.json();
        this.setState({modalOpen: false});
      } catch (err) { alert(err); }
    })();
  }

  render() {
    const {model, schema, bindInput} = this.props;

    return (
      <Modal
        size='small'
        trigger={<Button onClick={this.handleOpen}>Create</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>New Proposal</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.onSave}>
            <Form.Field control={Input} label='Name' name='name' placeholder='Name' value={model.name} error={!schema.fields.name.isValid} {...bindInput('name')}/>
            <Form.Field control={Button}>Create</Form.Field>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }  
}

export default compose(
  reformed(),
  validateSchema({
    name: {required: true, maxLength: 8},
    last: {required: true, maxLength: 8},
    email: {required: true, maxLength: 8}
  })
)(CreateModal);
