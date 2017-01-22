import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
 
import App from '../imports/ui/app.jsx';
import '../imports/api/voters.js';

// hoist environment variables
for (var key in Meteor.settings.public) { process.env[key] = Meteor.settings.public[key]; }

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});