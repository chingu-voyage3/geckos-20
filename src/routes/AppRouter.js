/* eslint-disable import/no-named-as-default */
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import App from '../App';
import Signin from '../components/Signin';

export const history = createHistory();

export default () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Signin} />
      <Route path="/dashboard" component={App} />
    </Switch>
  </Router>
);
