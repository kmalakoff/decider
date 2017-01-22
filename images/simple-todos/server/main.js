import {Meteor} from 'meteor/meteor';
import _ from 'lodash';

// expose environemnt variables to client
const CLIENT_ENV_VARS = ['NODE_ENV', 'API_URL'];
CLIENT_ENV_VARS.forEach(key => exposeEnvVar(key));

import Voters from '../imports/api/voters.js';

Meteor.startup(function() {
  Meteor.publish('voters.list', function() { return Voters.find(); });
});
