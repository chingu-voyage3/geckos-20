/* eslint-disable import/no-named-as-default */
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import App from '../App';
import NewCard from '../components/NewCard';
import EditCard from '../components/EditCard';
import LoginPage from '../components/LoginPage';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

export default () => (
  <Router history={history}>
    <Switch>
      <PublicRoute exact path="/" component={LoginPage} />
      <PrivateRoute path="/dashboard" component={App} />
      <PrivateRoute path="/dashboard/new" component={NewCard} />
      <PrivateRoute path="/dashboard/edit/:card_id" component={EditCard} />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);
