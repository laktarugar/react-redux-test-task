/**
 * Created by alexanderklimenko on 9/17/15.
 */

import User from '../model/User';

export const CHECK_USER = 'CHECK_USER';

export function checkUser(user) {
  return {
    type: CHECK_USER,
    user
  }
}

export const ADD_USER = 'ADD_USER';
export function addUser(user) {
  return {
    type: ADD_USER,
    user
  }
}

export const ERR_ADD_USER = 'ERR_ADD_USER';

export function addWithCheck(user) {

  user = Object.assign(new User(), user);

  return (dispatch, getState) => {
    dispatch(checkUser(user));

    let state = getState();
    if (!!state.user.isValid) {

      return user.save()
        .then(() => {
          dispatch(addUser(user));
          return Promise.resolve('ok');
        }, (errors) => {
          dispatch({
            type: ERR_ADD_USER,
            errors
          });
          return Promise.reject('fail');
        });

    } else {

      return Promise.reject('fail');

    }
  }
}


export const FETCH_USERS = 'FETCH_USERS';
export function fetchUsers() {
  return (dispatch, getState) => {
    return User.fetch()
      .then((users) => {
        dispatch({
          type: FETCH_USERS,
          users
        });
      });
  };
}
