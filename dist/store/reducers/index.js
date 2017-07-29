'use strict';

var _redux = require('redux');

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _modal = require('./modal');

var _modal2 = _interopRequireDefault(_modal);

var _profile = require('./profile');

var _profile2 = _interopRequireDefault(_profile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducers = {
  auth: _auth2.default,
  modal: _modal2.default,
  profile: _profile2.default
};

var rootReducer = (0, _redux.combineReducers)(reducers);

rootReducer.reducers = reducers;

module.exports = rootReducer;