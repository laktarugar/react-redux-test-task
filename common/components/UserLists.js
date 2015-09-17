/**
 * Created by alexanderklimenko on 9/17/15.
 */

import React, { Component, PropTypes } from 'react';


class UserList extends Component {

  render() {
    const {items} = this.props;

    console.log('state items', items);

    let listsHtml = items.map((item, index) => {
      return (
        <li key={index}>
          <UserListItem user={item}></UserListItem>
        </li>
      );
    });

    return (
      <div>
        <ul>{listsHtml}</ul>
      </div>
    );
  }
}

UserList.propTypes = {
  items: React.PropTypes.array.isRequired
};

class UserListItem extends Component {
  render() {
    const {user} = this.props;
    return (
      <div>
        <dl>
          <dt>Name</dt>
          <dd>{user.name}</dd>

          <dt>Email</dt>
          <dd>{user.email}</dd>
        </dl>
      </div>
    );
  }
}


export default UserList;
