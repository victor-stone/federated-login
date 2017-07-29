'use strict';

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _reducers = require('./store/reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _auth = require('./store/actions/auth');

var _auth2 = _interopRequireDefault(_auth);

var _modal = require('./store/actions/modal');

var _modal2 = _interopRequireDefault(_modal);

var _profile = require('./store/actions/profile');

var _profile2 = _interopRequireDefault(_profile);

var _login = require('./components/login');

var _login2 = _interopRequireDefault(_login);

var _providers = require('./auth/providers');

var _providers2 = _interopRequireDefault(_providers);

var _idProvider = require('./auth/id-provider');

var _idProvider2 = _interopRequireDefault(_idProvider);

var _authorizers = require('./auth/authorizers');

var _authorizers2 = _interopRequireDefault(_authorizers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  store: _store2.default,
  loginReducers: _reducers2.default,
  actions: {
    auth: _auth2.default,
    modal: _modal2.default,
    profile: _profile2.default
  },
  loginPopup: _login2.default,
  providers: _providers2.default,
  IdProvider: _idProvider2.default,
  authorizers: _authorizers2.default
};