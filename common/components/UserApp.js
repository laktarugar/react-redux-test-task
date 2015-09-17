/**
 * Created by alexanderklimenko on 9/17/15.
 */
import React, { Component, PropTypes } from 'react';
import UserLists from './UserLists';
import UserEditForm from './UserEditForm';

class UserApp extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      list: this.props.list || [],
      newUser: this.props.newUser || {}
    };
  }

  render() {
    let { list, newUser } = this.state;

    return (
      <div>
        <h3>User create form</h3>
        <UserEditForm user={newUser} saveAction={this.saveAction.bind(this)}></UserEditForm>
        <hr/>
        <UserLists items={list}></UserLists>
      </div>
    );
  }

  saveAction(user) {
    dispatch(this.props.addUser(user));
    alert('save' + user);
  }
}

export default UserApp;
