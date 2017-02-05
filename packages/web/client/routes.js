import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import App from './components/app';
import Dashboard from './components/dashboard';
import Proposals from './components/proposals';
import Votes from './components/votes';
import Users from './components/users';

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="proposals" component={Proposals}/>
      <Route path="votes" component={Votes}/>
      <Route path="users" component={Users}/>
    </Route>
  </Router>
);
