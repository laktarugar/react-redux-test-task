/**
 * Created by alexanderklimenko on 9/17/15.
 */
import superagent from 'superagent';

import config from '../config';
let userList = [];

// @TODO remove hack with 'http://localhost:3000'
export const USER_API_URL = 'http://localhost:3000/api/user';

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  save() {
    return new Promise((resolve, reject) => {
      superagent
        .post(USER_API_URL)
        .set('Accept', 'application/json')
        .send(this.toJson())
        .end((err, res) => {
          if (res.ok) {
            resolve(res.body);
          } else {
            reject(err.response.body);
          }
        });
    });
  }

  toJson() {
    let { name, email } = this;
    return { name, email };
  }

  toString() {
    return this.name + '|' + this.email;
  }

  static fetch() {
    return new Promise((resolve, reject) => {
      superagent
        .get(USER_API_URL)
        .end((err, res) => {
          if (res.ok) {
            resolve(res.body);
          } else {
            reject(err.response.body);
          }
        });
    });
  }

  /**
   * validate user
   *
   * @param {User} user
   * @returns {Promise}
   */
  static valid(user) {
    let validatePromise = new Promise((response, reject) => {
      response();
    });

    return validatePromise;
  }
}


export default User
