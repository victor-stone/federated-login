const AUTH_USER      = 'AUTH_USER';
const UNAUTH_USER    = 'UNAUTH_USER';
const SET_USER       = 'SET_USER';
const SET_AUTH_PROVIDER   = 'SET_AUTH_PROVIDER';

function logoutUser(){
  return {
      type: UNAUTH_USER
    };
}

function setUser(user){
  return function(dispatch){
    dispatch({
      type: AUTH_USER
    });
    dispatch({
      type: SET_USER,
      payload: user
    });
  };
}

function setProvider(provider) {
  return {
      type: SET_AUTH_PROVIDER,
      payload: provider
    };
}

module.exports = {
  logoutUser,
  setUser,
  setProvider,

  AUTH_USER,
  UNAUTH_USER,
  SET_USER,
  SET_AUTH_PROVIDER
};