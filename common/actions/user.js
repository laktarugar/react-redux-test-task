/**
 * Created by alexanderklimenko on 9/17/15.
 */

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

export function addWithCheck(user) {
  return (dispatch, getState) => {
    dispatch(checkUser(user));

    let state = getState();
    if (!!state.user.isValid) {
      dispatch(addUser(user));
      return Promise.resolve('ok');
    } else {
      return Promise.reject('fail');
    }
  }
}
