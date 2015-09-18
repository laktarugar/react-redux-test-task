/**
 * Created by alexanderklimenko on 9/17/15.
 */

import { CHECK_USER, ADD_USER, ERR_ADD_USER } from '../actions/user';
import User from '../model/User';

export const defaultState = {
  list: [],
  newUser: new User(),
  isValid: true,
  validErrors: {}
};

export default function userReducer(state = defaultState, action) {
  switch(action.type) {
    case CHECK_USER:
      let isValid = true;
      let validErrors = {
        name: [],
        email: []
      };

      isValid &= required(action.user.name, validErrors.name);
      isValid &= required(action.user.email, validErrors.email);
      isValid &= email(action.user.email, validErrors.email);

      return Object.assign({}, state, {
        isValid,
        validErrors
      });

    case ERR_ADD_USER:
          return Object.assign({}, state, {
            isValid: false,
            validErrors: action.errors
          });

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

const EMAIL_REGEXP = /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm;

function required(value, messages) {
  if (!value) {
    messages.push('Required');
    return false;
  }

  return true;
}

function email(value, messages) {

  if (!!value && !!value.test && value.test(EMAIL_REGEXP)) {
    messages.push('Invalid Email');
    return false;
  }

  return true;
}
