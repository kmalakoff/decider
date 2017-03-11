import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { Switch, Route } from 'react-router';

import Dashboard from '../dashboard';
import Proposals from '../proposals';
import Votes from '../votes';
import Users from '../users';

@observer
export default class App extends Component {
  static contextTypes = { store: React.PropTypes.object.isRequired }

  state = {}
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { store } = this.context;

    return (
      <div>
        <Menu>
          <NavLink className="item" to="/" exact activeClassName="active">Dashboard</NavLink>
          <NavLink className="item" to="/votes" activeClassName="active">Votes</NavLink>
          <NavLink className="item" to="/proposals" activeClassName="active">Proposals</NavLink>
          <NavLink className="item" to="/users" activeClassName="active">Users</NavLink>
        </Menu>
        <Switch>
          <Route path="/" exactly component={Dashboard} />
          <Route path="/proposals" component={Proposals} />
          <Route path="/votes" component={Votes} />
          <Route path="/users" component={Users} />
        </Switch>
      </div>
    );
  }
}
