import 'babel-polyfill'; // async / await

// hoist environment variables
for (const key in window.__ENV__) { process.env[key] = window.__ENV__[key]; }

import 'semantic-ui-css/semantic.css';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Provider from './provider';
import Routes from './routes';
import Store from './store';

const store = new Store();

render(
  <AppContainer>
    <Provider store={store}>
      <Routes />
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./components/app', () => {
    const NextRoutes = require('./routes').default;

    render(
      <AppContainer>
        <Provider store={store}>
          <NextRoutes />
        </Provider>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}

// import DevTools from 'mobx-react-devtools';
// <DevTools />
