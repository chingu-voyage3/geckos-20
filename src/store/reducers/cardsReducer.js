import * as types from '../types';

const initialState = {
  cards: []
};

export default (state = initialState, action) => {
  switch (action.type) {
  case types.FETCH_CARDS:
    return { ...state, cards: action.cards };
  case types.TOGGLE_TASK:
    return { ...state, cards: action.cards };

  default:
    return state;
  }
};
