import React, {Component} from 'react';
import {observer} from 'mobx-react';
import CreateModal from './create-modal';
import {List} from 'semantic-ui-react';

@observer
export default class Users extends Component {
  static contextTypes = {store: React.PropTypes.object.isRequired}

  render() {
    const {store} = this.context;

    return (
      <div>
        <List divided relaxed>
          {store.users.map((x) => 
            <List.Item key={x._id}>
              <List.Icon name='github' size='large' verticalAlign='middle' />
              <List.Content>
                <List.Header as='a'>{x.first||''} {x.last||''}</List.Header>
                <List.Description as='a'>{x.email||''}</List.Description>
              </List.Content>
            </List.Item>
          )}
        </List>
        <CreateModal/>
      </div>
    );
  }
};
