import providers from '../../auth/providers';

import { 
  SET_CREDENTIALS, 
  CLEAR_CREDENTIALS, 
  SET_AUTH_PROVIDER
} from '../actions/auth';

const EMPTY_CREDENTIALS = {
  accessKeyId: '',
  secretAccessKey: '',
  sessionToken: '',
  identityId: ''  
};

const INITIAL_STATE = {
  provider:       null,
  ...EMPTY_CREDENTIALS
};

const reducer = (state = INITIAL_STATE, action) => {

  switch(action.type){
    case SET_CREDENTIALS:
      return {
        ...state,
        authenticated: true,
        ...action.credentials
      };

    case CLEAR_CREDENTIALS: {
      const idProvider = providers.find( state.provider );
      idProvider.logout();
      return {
        ...state,
        authenticated: false,
        ...EMPTY_CREDENTIALS
      };
    }

    case SET_AUTH_PROVIDER:
      return {
        ...state,
        provider: action.provider
      };
  }
  return state;
};

module.exports = reducer;
