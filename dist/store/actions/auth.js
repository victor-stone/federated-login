'use strict';

var SET_CREDENTIALS = 'SET_CREDENTIALS';
var CLEAR_CREDENTIALS = 'CLEAR_CREDENTIALS';
var SET_AUTH_PROVIDER = 'SET_AUTH_PROVIDER';

function clearCredentails() {
  return {
    type: CLEAR_CREDENTIALS
  };
}

function setCredentails(credentials) {
  return {
    type: SET_CREDENTIALS,
    credentials: credentials
  };
}

function setProvider(provider) {
  return {
    type: SET_AUTH_PROVIDER,
    provider: provider
  };
}

module.exports = {
  clearCredentails: clearCredentails,
  setCredentails: setCredentails,
  setProvider: setProvider,

  SET_CREDENTIALS: SET_CREDENTIALS,
  CLEAR_CREDENTIALS: CLEAR_CREDENTIALS,
  SET_AUTH_PROVIDER: SET_AUTH_PROVIDER
};