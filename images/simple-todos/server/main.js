import {Meteor} from 'meteor/meteor';
import _ from 'lodash';
import '../imports/api/voters.js';

// expose environemnt variables to client
const CLIENT_ENV_VARS = ['NODE_ENV', 'API_URL'];
CLIENT_ENV_VARS.forEach(key => exposeEnvVar(key));

Meteor.startup(() => {
  // code to run on server at startup
});
