import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {List} from 'semantic-ui-react';
import CreateModal from './create-modal';

@observer
export default class Proposals extends Component {
  static contextTypes = {store: React.PropTypes.object.isRequired}

  render() {
    const {store} = this.context;

    return (
      <div>
        <List divided relaxed>
          {store.proposals.map((x) => 
            <List.Item key={x._id}>
              <List.Icon name='github' size='large' verticalAlign='middle' />
              <List.Content>
                <List.Header as='a'>{x.name||''}</List.Header>
              </List.Content>
            </List.Item>
          )}
        </List>
        <CreateModal/>
      </div>
    );
  }
};
