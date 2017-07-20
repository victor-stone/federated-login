import providers from '../../auth/providers';

import { 
  AUTH_USER, 
  UNAUTH_USER, 
  SET_USER,
  SET_AUTH_PROVIDER
} from '../actions/auth';

const INITIAL_STATE = {
  authenticated:    false,
  requestingAuth:   false,
  requestingUnauth: false,
  provider: null,
  user: {}
};

const reducer = (state = INITIAL_STATE, action) => {

  console.log( 'reducer action', action ); // eslint-disable-line
  
  switch(action.type){
    case AUTH_USER:
      return {
        ...state,
        authenticated: true,
        requestingAuth: false
      };
    case UNAUTH_USER: {
      const idProvider = providers.find( state.provider );
      idProvider.logout();
      return {
        ...state,
        authenticated: false,
        requestingUnauth: false,
        user: {}
      };
    }
    case SET_USER:
      return {
        ...state,
        user: { ...action.payload }
      };
    case SET_AUTH_PROVIDER:
      return {
        ...state,
        provider: action.payload
      };
  }
  return state;
};

module.exports = reducer;
