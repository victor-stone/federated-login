import providers from '../../auth/providers';

import { 
  AUTH_USER, 
  UNAUTH_USER, 
  SET_USER,
  SET_AUTH_PROVIDER
} from '../actions/auth';

const CREDENTIALS = {
  accessKey: '',
  secretKey: '',
  sessionToken: '',
  indenityId: ''  
};

const NO_USER = {
  authenticated:  false,
  ...CREDENTIALS
};

const INITIAL_STATE = {
  provider:       null,
  user: {},
  ...NO_USER
};

const reducer = (state = INITIAL_STATE, action) => {

  switch(action.type){
    case AUTH_USER:
      return {
        ...state,
        authenticated: true,
        ...action.credentials
      };

    case UNAUTH_USER: {
      const idProvider = providers.find( state.provider );
      idProvider.logout();
      return {
        ...state,
        authenticated: false,
        user: {},
        ...NO_USER
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
