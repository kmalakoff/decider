import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Menu} from 'semantic-ui-react';
import {Link, IndexLink} from 'react-router';

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
          <IndexLink className="item" to="/" activeClassName="active">Dashboard</IndexLink>
          <Link className="item" to="/votes" activeClassName="active">Votes</Link>
          <Link className="item" to="/proposals" activeClassName="active">Proposals</Link>
          <Link className="item" to="/users" activeClassName="active">Users</Link>
        </Menu>
        {this.props.children}
      </div>
    );
  }
};
