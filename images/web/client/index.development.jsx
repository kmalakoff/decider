import 'babel-polyfill'; // async / await
for (var key in window.__ENV__) { process.env[key] = window.__ENV__[key]; } // hoist environment variables

import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import Provider from './provider';
import App from './app';
import Store from './store';

const store = new Store();

render(
  <AppContainer>
    <Provider store={store}>
      <App/>
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default;

    render(
      <AppContainer>
        <Provider store={store}>
          <NextApp/>
        </Provider>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
