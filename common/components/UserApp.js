/**
 * Created by alexanderklimenko on 9/17/15.
 */
import React, { Component, PropTypes } from 'react';
import UserLists from './UserLists';
import UserEditForm from './UserEditForm';

class UserApp extends Component {
  render() {
    let { list, newUser, addUser } = this.props;

    console.log(this.props);

    return (
      <div>
        <h3>User create form</h3>
        <UserEditForm user={newUser} saveAction={user => addUser(user)}></UserEditForm>
        <hr/>
        <UserLists items={list}></UserLists>
      </div>
    );
  }
}

export default UserApp;
