import 'babel-polyfill'; // async / await

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
