/**
 * Created by alexanderklimenko on 9/17/15.
 */
import React, { Component, PropTypes } from 'react';
import User from '../api/User';

let uniqId=0;

class UserEditForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: this.props.user || {}
    };
  }

  render() {
    const { user, saveAction} = this.props;

    console.log('user', user);

    return (
      <form method="POST" onChange={this.changeAction.bind(this)} onSubmit={this.submitAction.bind(this)}>
        <div>
          <label>Name</label>
          <input type="text" required defaultValue={user.name} ref="name"></input>
        </div>

        <div>
          <label>Email</label>
          <input type="email" required defaultValue={user.email} ref="email"></input>
        </div>

        <button type="submit">Save!</button>

      </form>
    );
  }

  changeAction(e) {
    e.preventDefault();
    let nameEl = React.findDOMNode(this.refs.name);
    let emailEl = React.findDOMNode(this.refs.email);

    //@todo some check

    let user = new User(nameEl.value.trim(), emailEl.value.trim());

    this.setState({user});
  }

  submitAction(e) {
    e.preventDefault();
    console.log('submit');
    console.log(this.state.user);
    this.props.saveAction(this.state.user);

    let nameEl = React.findDOMNode(this.refs.name);
    let emailEl = React.findDOMNode(this.refs.email);
    nameEl.value = '';
    emailEl.value = '';
  }
}

UserEditForm.propTypes = {
  saveAction: PropTypes.func.isRequired,
  user: React.PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string
  })
};

export default UserEditForm;
