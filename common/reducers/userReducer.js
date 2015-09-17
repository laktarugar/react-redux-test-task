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
      let test = Object.assign({}, state, {
        list: [
          ...state.list,
          action.user
        ]
      });

      //test.list.push(action.user);

      console.log(ADD_USER, state, test, action);
      return test;
    default:
      return state;
  }
}

