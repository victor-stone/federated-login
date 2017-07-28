import { combineReducers } from 'redux';

import auth    from './auth';
import modal   from './modal';
import profile from './profile';

const reducers = {
  auth,
  modal,
  profile
};

const rootReducer = combineReducers(reducers);

rootReducer.reducers = reducers;

module.exports = rootReducer;
