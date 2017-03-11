import React, { Component } from 'react';
import { Button, Header, Image, Modal, Form, Input } from 'semantic-ui-react';

import cx from 'classnames';
import reformed from 'react-reformed';
import compose from 'react-reformed/lib/compose';
import validateSchema from 'react-reformed/lib/validateSchema';

class CreateModal extends Component {
  state = { modalOpen: false }
  handleOpen = e => this.setState({ modalOpen: true })
  handleClose = e => this.setState({ modalOpen: false })

  onSave = (e, { formData }) => {
    e.preventDefault();

    (async () => {
      try {
        const res = await fetch(`${process.env.API_SERVICE_URL}/commands/v1/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const json = await res.json();
        this.setState({ modalOpen: false });
      } catch (err) { alert(err); }
    })();
  }

  render() {
    const { model, schema, bindInput } = this.props;

    return (
      <Modal
        size="small"
        trigger={<Button onClick={this.handleOpen}>Create</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>New Proposal</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.onSave}>
            <Form.Field control={Input} label="First" name="first" placeholder="First" value={model.first} error={!schema.fields.first.isValid} {...bindInput('first')} />
            <Form.Field control={Input} label="Last" name="last" placeholder="Last" value={model.last} error={!schema.fields.last.isValid} {...bindInput('last')} />
            <Form.Field control={Input} label="Email" name="email" placeholder="your@email.com" value={model.email} error={!schema.fields.email.isValid} {...bindInput('email')} />
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
    first: { required: true, maxLength: 8 },
    last: { required: true, maxLength: 8 },
    email: { required: true, maxLength: 8 }
  })
)(CreateModal);
