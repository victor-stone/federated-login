'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = user;

var _profile = require('../actions/profile');

var initialState = {
  username: '',
  fname: '',
  lname: '',
  email: '',
  phone: '',
  picture: ''
};

function user() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {

    case _profile.SET_PROFILE:
      return _extends({}, state, action.profile);

    default:
      return state;
  }
}