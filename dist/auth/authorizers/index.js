'use strict';

var _facebook = require('./facebook');

var _facebook2 = _interopRequireDefault(_facebook);

var _google = require('./google');

var _google2 = _interopRequireDefault(_google);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  Facebook: _facebook2.default,
  Google: _google2.default
};