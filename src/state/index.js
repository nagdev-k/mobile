import { combineReducers } from 'redux';

import AuthReducer from './auth';


const rootRedcuer = combineReducers({
  AuthReducer,
});

export default rootRedcuer;
