/**
 * Created by alexanderklimenko on 9/17/15.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import User from '../model/User';
import { checkUser, addWithCheck } from '../actions/user';

let uniqId=0;

@connect(
  state => ({
    isValid: state.user.isValid,
    validErrors: state.user.validErrors
  }),
  dispatch => bindActionCreators({
    check: checkUser,
    saveAction: addWithCheck
  }, dispatch)
)

class UserEditForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: this.props.user || {}
    };
  }

  render() {
    const { user, isValid, validErrors} = this.props;

    return (
      <form method="POST" onChange={this.changeAction.bind(this)} onSubmit={this.submitAction.bind(this)}>
        {!isValid && <div>Form invalid</div>}
        <div>
          <label>Name</label>
          <input type="text" name="name" defaultValue={user.name} ref="name"></input>
          {!!validErrors && validErrors.name && !!validErrors.name.length && <div>
            <h6>Error</h6>
            <p>{validErrors.name.join(<br/>)}</p>
          </div>}
        </div>

        <div>
          <label>Email</label>
          <input type="email" name="email" required defaultValue={user.email} ref="email"></input>
        </div>

        <button type="submit">Save!</button>
      </form>
    );
  }

  changeAction(e) {
    e.preventDefault();
    let name = React.findDOMNode(this.refs.name).value.trim();
    let email = React.findDOMNode(this.refs.email).value.trim();

    console.log('name', name);

    this.setState({
      user:{
        name,
        email
      }
    });

    this.props.check({
      name,
      email
    });
  }

  submitAction(e) {
    e.preventDefault();

    this.props.saveAction(this.state.user).then(
      (data) => {
        let nameEl = React.findDOMNode(this.refs.name);
        let emailEl = React.findDOMNode(this.refs.email);
        nameEl.value = '';
        emailEl.value = '';
        return data;
      }
    );
  }
}

UserEditForm.propTypes = {
  check: PropTypes.func.isRequired,
  saveAction: PropTypes.func.isRequired,
  user: React.PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string
  })
};

export default UserEditForm;
