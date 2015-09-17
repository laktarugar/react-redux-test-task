/**
 * Created by alexanderklimenko on 9/17/15.
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserApp from '../components/UserApp';
import * as UserActions from '../actions/user';

function mapStateToProps(state) {
  console.log('mapStateToProps', state);
  return {
    newUser: state.user.newUser,
    list: state.user.list
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(UserActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserApp);
