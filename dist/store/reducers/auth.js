'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _providers = require('../../auth/providers');

var _providers2 = _interopRequireDefault(_providers);

var _auth = require('../actions/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EMPTY_CREDENTIALS = {
  accessKeyId: '',
  secretAccessKey: '',
  sessionToken: '',
  identityId: ''
};

var INITIAL_STATE = _extends({
  provider: null
}, EMPTY_CREDENTIALS);

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments[1];


  switch (action.type) {
    case _auth.SET_CREDENTIALS:
      return _extends({}, state, {
        authenticated: true
      }, action.credentials);

    case _auth.CLEAR_CREDENTIALS:
      {
        var idProvider = _providers2.default.find(state.provider);
        idProvider.logout();
        return _extends({}, state, {
          authenticated: false
        }, EMPTY_CREDENTIALS);
      }

    case _auth.SET_AUTH_PROVIDER:
      return _extends({}, state, {
        provider: action.provider
      });
  }
  return state;
};

module.exports = reducer;