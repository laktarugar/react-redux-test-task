import { combineReducers } from 'redux';
import counter from './counter';
import user from './userReducer';

const rootReducer = combineReducers({
  counter,
  user
});

export default rootReducer;
