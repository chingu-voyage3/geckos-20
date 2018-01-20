import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import cardsReducer from './reducers/cardsReducer';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      cards: cardsReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
