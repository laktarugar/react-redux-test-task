/**
 * Created by alexanderklimenko on 9/17/15.
 */
"use strict";

let userList = [];



class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  toString() {
    return this.name + '|' + this.email;
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
