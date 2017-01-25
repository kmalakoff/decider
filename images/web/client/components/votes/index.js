import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {List} from 'semantic-ui-react';

@observer
export default class Votes extends Component {
  static contextTypes = {store: React.PropTypes.object.isRequired}

  render() {
    const {store} = this.context;

    return (
      <div>
        <button onClick={this.onCompleteSomething}>
          CompleteSomething
        </button>
        <List divided relaxed>
          {store.things.map((x) => 
            <List.Item key={x._id}>
              <List.Icon name='github' size='large' verticalAlign='middle' />
              <List.Content>
                <List.Header as='a'>{x.title}</List.Header>
                <List.Description as='a'>{`Completed: ${x.completed_count}`}</List.Description>
              </List.Content>
            </List.Item>
          )}
        </List>
      </div>
    );
  }

  onCompleteSomething = () => {
    (async () => {
      try {
        let res = await fetch(`${process.env.API_SERVICE_URL}/commands/v1/voters/100/complete_something`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({voter_id: 100})
        });
        const json = await res.json();
      } catch (err) { alert(err); }
    })();
  }
};
