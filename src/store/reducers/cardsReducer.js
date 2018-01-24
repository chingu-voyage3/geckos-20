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
  case types.DELETE_TASK:
    return { ...state, cards: action.cards };
  case types.ADD_TASK:
    return { ...state, cards: action.cards };
  case types.ADD_CARD:
    return { ...state, cards: action.cards };
  case types.UPDATE_CARD:
    return { ...state, cards: action.cards };
  default:
    return state;
  }
};
