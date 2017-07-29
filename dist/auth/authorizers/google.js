'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _idProvider = require('../id-provider');

var _idProvider2 = _interopRequireDefault(_idProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/* globals gapi */

var GoogleLoginButton = function (_React$Component) {
  _inherits(GoogleLoginButton, _React$Component);

  function GoogleLoginButton() {
    _classCallCheck(this, GoogleLoginButton);

    return _possibleConstructorReturn(this, (GoogleLoginButton.__proto__ || Object.getPrototypeOf(GoogleLoginButton)).apply(this, arguments));
  }

  _createClass(GoogleLoginButton, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.gapi && gapi.signin2.render('gsignup', {
        onsuccess: 'googleLogin'
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { className: 'g-signin2', id: 'gsignup', 'data-onsuccess': 'googleLogin', 'data-theme': 'dark' });
    }
  }]);

  return GoogleLoginButton;
}(_react2.default.Component);

var GoogleLogin = function (_IdProvider) {
  _inherits(GoogleLogin, _IdProvider);

  function GoogleLogin() {
    _classCallCheck(this, GoogleLogin);

    var _this2 = _possibleConstructorReturn(this, (GoogleLogin.__proto__ || Object.getPrototypeOf(GoogleLogin)).call(this, _extends({}, arguments, { name: 'google' })));

    _this2._accessToken = null;
    window.googleLogin = _this2.getStatus.bind(_this2);
    return _this2;
  }

  _createClass(GoogleLogin, [{
    key: 'logout',
    value: function logout() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut(); // <--promise
    }
  }, {
    key: '_initSDK',
    value: function _initSDK() {
      var _config$Google = this._config.Google,
          clientId = _config$Google.clientId,
          scope = _config$Google.scope;


      var id = 'google-sdk';
      if (!document.getElementById(id)) {
        var firstTag = document.getElementsByTagName('script')[0];
        var head = firstTag.parentNode;

        var meta = document.createElement('meta');
        meta.name = 'google-signin-scope';
        meta.contnent = scope;
        document.getElementsByTagName('head')[0].appendChild(meta);
        meta = document.createElement('meta');
        meta.name = 'google-signin-client_id';
        meta.content = clientId;
        document.getElementsByTagName('head')[0].appendChild(meta);

        var js = document.createElement('script');
        js.id = id;
        js.src = 'https://apis.google.com/js/platform.js';
        head.insertBefore(js, firstTag);
      }
    }
  }, {
    key: 'getStatus',
    value: function getStatus(googleUser) {

      // if (authResult['status']['signed_in']) {    
      // authResult['id_token']

      if (googleUser) {
        console.log('googleuser', googleUser); // eslint-disable-line
        this._accessToken = googleUser.getAuthResponse().id_token;
        var profile = googleUser.getBasicProfile();
        var fields = {
          email: profile.getEmail(),
          picture: profile.getImageUrl(),
          first_name: profile.getName()
        };
        this.onAuthenticated(fields);
      } else {
        this._accessToken = null;
        this.onNotAuthenticated();
      }
    }
  }, {
    key: 'loginDescriptor',
    get: function get() {
      return this._accessToken && { 'accounts.google.com': this._accessToken };
    }
  }, {
    key: 'ux',
    get: function get() {
      var _this3 = this;

      this._initSDK();
      return function (props) {
        // console.log('ux props', props); // eslint-disable-line
        _this3.props = _extends({}, props);
        return _react2.default.createElement(GoogleLoginButton, null);
      };
    }
  }]);

  return GoogleLogin;
}(_idProvider2.default);

module.exports = new GoogleLogin();