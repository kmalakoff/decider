import 'babel-polyfill'; // async / await

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
