/**
 * Created by alexanderklimenko on 9/17/15.
 */

export const CHECK_USER = 'CHECK_USER';
export const ADD_USER = 'ADD_USER';

export function checkUser(user) {
  return {
    type: CHECK_USER,
    user
  }
}

export function addUser(user) {
  return {
    type: ADD_USER,
    user
  }
}
