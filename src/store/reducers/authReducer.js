import * as types from '../types';

export default (state = {}, action) => {
  switch (action.type) {
  case types.LOGIN:
    return {
      uid: action.uid
    };
  case types.LOGOUT:
    return {};
  default:
    return state;
  }
};
