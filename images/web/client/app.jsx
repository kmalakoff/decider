import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Menu, List} from 'semantic-ui-react';

import 'semantic-ui-css/semantic.css';

@observer
export default class App extends Component {
  static contextTypes = {store: React.PropTypes.object.isRequired}

  state = {}
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const {store} = this.context;

    return (
      <div>
        <Menu>
          <Menu.Item header>Our Company</Menu.Item>
          <Menu.Item name='aboutUs' active={this.state.activeItem === 'aboutUs'} onClick={this.handleItemClick} />
          <Menu.Item name='jobs' active={this.state.activeItem === 'jobs'} onClick={this.handleItemClick} />
          <Menu.Item name='locations' active={this.state.activeItem === 'locations'} onClick={this.handleItemClick} />
        </Menu>
        <button onClick={this.onReset}>
          Seconds passed: {store.timer}
        </button>
        <button onClick={this.onCompleteSomething}>
          CompleteSomething
        </button>
        <List divided relaxed>
          {store.things.map((x) => 
            <List.Item key={x.id}>
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

  onReset = () => {
    const {store} = this.context;
    store.resetTimer();
  }

  onCompleteSomething = () => {
    (async () => {
      try {
        let res = await fetch(`${process.env.API_URL}/commands/v1/voters/100/complete_something`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({voter_id: 100})
        });
        const json = await res.json();

        const {store} = this.context;
        await store.fetch();
      } catch (err) { alert(err); }
    })();
  }
};

// import DevTools from 'mobx-react-devtools';
// <DevTools />
