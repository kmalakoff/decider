import {Meteor} from 'meteor/meteor';
import _ from 'lodash';

// expose environemnt variables to client
const CLIENT_ENV_VARS = ['NODE_ENV', 'API_URL'];
CLIENT_ENV_VARS.forEach(key => exposeEnvVar(key));

import Voter from '../imports/api/voters';

Meteor.startup(function() {});
