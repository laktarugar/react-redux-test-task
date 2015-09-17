/**
 * Created by alexanderklimenko on 9/17/15.
 */

import { CHECK_USER, ADD_USER } from '../actions/user';
import User from '../api/User';

const defaultState = {
  list: [],
  newUser: new User()
};


export default function userReducer(state = defaultState, action) {
  switch(action.type) {
    case CHECK_USER:
      console.log(CHECK_USER, state, action);
      return state;
    case ADD_USER:
      return Object.assign({}, state, {
        newUser: new User(),
        list: [
          ...state.list,
          action.user
        ]
      });
    default:
      return state;
  }
}

