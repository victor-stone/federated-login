'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fakeLogin = function fakeLogin() {};
fakeLogin.Popup = function () {};
fakeLogin.defaultStyles = { content: {}, overlay: {} };

var FederatedLoginsLib = function () {
  function FederatedLoginsLib() {
    _classCallCheck(this, FederatedLoginsLib);
  }

  _createClass(FederatedLoginsLib, [{
    key: 'quietMode',
    set: function set(flag) {
      this._quietMode = flag;
    },
    get: function get() {
      return this._quietMode;
    }
  }, {
    key: 'store',
    get: function get() {
      return require('./store');
    }
  }, {
    key: 'loginReducers',
    get: function get() {
      return require('./store/reducers');
    }
  }, {
    key: 'actions',
    get: function get() {
      return {
        auth: require('./store/actions/auth'),
        modal: require('./store/actions/modal'),
        profile: require('./store/actions/profile')
      };
    }
  }, {
    key: 'loginPopup',
    get: function get() {
      return this._quietMode ? fakeLogin : require('./components/login');
    }
  }, {
    key: 'providers',
    get: function get() {
      var providers = require('./auth/providers');
      providers.quietMode = this._quietMode;
      return providers;
    }
  }, {
    key: 'IdProvider',
    get: function get() {
      return require('./auth/id-provider');
    }
  }, {
    key: 'authorizers',
    get: function get() {
      return require('./auth/authorizers');
    }
  }]);

  return FederatedLoginsLib;
}();

module.exports = new FederatedLoginsLib();