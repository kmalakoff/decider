import React from 'react';
import { Router } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './components/app';

export default () => (
  <BrowserRouter>
    <Route path="/" component={App} />
  </BrowserRouter>
);
