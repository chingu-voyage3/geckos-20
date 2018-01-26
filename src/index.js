import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import AppRouter, { history } from './routes/AppRouter';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import { firebase } from './firebase/firebase';
import { login, logout } from './store/actions/authActions';
import { fetchCards } from './store/actions/cardActions';

const store = configureStore();
const Root = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.info('user ', user.uid);
    store.dispatch(login(user.uid));

    store.dispatch(fetchCards()).then(() => {
      // renderApp();
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
    });
  } else {
    store.dispatch(logout());
    // renderApp();
    history.push('/');
  }
});

registerServiceWorker();
