import 'babel-polyfill'; // async / await

// hoist environment variables
for (var key in window.__ENV__) { process.env[key] = window.__ENV__[key]; }

import React from 'react';
import {render} from 'react-dom';

import Provider from './provider';
import App from './app';
import Store from './store';

const store = new Store();

render(
 <Provider store={store}>
   <App/>
  </Provider>,
  document.getElementById('root')
);
