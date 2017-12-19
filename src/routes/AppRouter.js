/* eslint-disable import/no-named-as-default */
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import App from '../App';
import NewCard from '../components/NewCard';
import EditCard from '../components/EditCard';
import LoginPage from '../components/LoginPage';

export const history = createHistory();

export default () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route path="/dashboard" component={App} />
      <Route path="/dashboard/new" component={NewCard} />
      <Route path="/dashboard/edit/:card_id" component={EditCard} />
      <Route component={App} />
    </Switch>
  </Router>
);
