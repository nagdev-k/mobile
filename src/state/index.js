import { combineReducers } from 'redux';

import AuthReducer from './auth';
import newUserMessagReducer from './availableusers';

const rootRedcuer = combineReducers({
  AuthReducer,
  newUserMessagReducer,
});

export default rootRedcuer;
