import {Meteor} from 'meteor/meteor';
import '../imports/api/voters.js';
import _ from 'lodash';

// expose environemnt variables to client
const CLIENT_ENV_VARS = ['NODE_ENV', 'API_URL'];
CLIENT_ENV_VARS.forEach(key => exposeEnvVar(key));

Meteor.startup(() => {
  // code to run on server at startup
});
