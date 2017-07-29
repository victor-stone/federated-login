'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _idProvider = require('../id-provider');

var _idProvider2 = _interopRequireDefault(_idProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/* globals FB */

var FacebookLoginButton = function (_React$Component) {
  _inherits(FacebookLoginButton, _React$Component);

  function FacebookLoginButton() {
    _classCallCheck(this, FacebookLoginButton);

    return _possibleConstructorReturn(this, (FacebookLoginButton.__proto__ || Object.getPrototypeOf(FacebookLoginButton)).apply(this, arguments));
  }

  _createClass(FacebookLoginButton, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.FB && FB.XFBML.parse();
    }
  }, {
    key: 'render',
    value: function render() {
      var _bool;

      var _props = this.props,
          _props$size = _props.size,
          size = _props$size === undefined ? 'large' : _props$size,
          _props$type = _props.type,
          type = _props$type === undefined ? ['login_with', 'continue_with'][0] : _props$type,
          _props$profilePick = _props.profilePick,
          profilePick = _props$profilePick === undefined ? false : _props$profilePick,
          _props$friends = _props.friends,
          friends = _props$friends === undefined ? false : _props$friends,
          _props$width = _props.width,
          width = _props$width === undefined ? undefined : _props$width,
          _props$autoLogout = _props.autoLogout,
          autoLogout = _props$autoLogout === undefined ? 'false' : _props$autoLogout,
          _props$scope = _props.scope,
          scope = _props$scope === undefined ? 'public_profile,email' : _props$scope,
          _props$className = _props.className,
          className = _props$className === undefined ? 'fb-login-button' : _props$className;


      var bool = (_bool = {}, _defineProperty(_bool, true, 'true'), _defineProperty(_bool, false, 'false'), _bool);

      return _react2.default.createElement('div', { className: className,
        'data-max-rows': '1',
        'data-width': width,
        'data-size': size,
        'data-button-type': type,
        'data-show-faces': bool[friends],
        'data-auto-logout-link': bool[autoLogout],
        'data-use-continue-as': bool[profilePick],
        'data-scope': scope,
        'data-onlogin': 'checkloginState();'
      });
    }
  }]);

  return FacebookLoginButton;
}(_react2.default.Component);

var FacebookLogin = function (_IdProvider) {
  _inherits(FacebookLogin, _IdProvider);

  function FacebookLogin() {
    _classCallCheck(this, FacebookLogin);

    var _this2 = _possibleConstructorReturn(this, (FacebookLogin.__proto__ || Object.getPrototypeOf(FacebookLogin)).call(this, _extends({}, arguments, { name: 'facebook' })));

    _this2._accessToken = null;
    return _this2;
  }

  _createClass(FacebookLogin, [{
    key: '_initSDK',
    value: function _initSDK() {
      var clientId = this._config.Facebook.clientId;


      window.checkloginState = this.getStatus.bind(this);
      window.fbAsyncInit = function () {
        FB.init({
          appId: clientId,
          autoLogAppEvents: true,
          xfbml: true,
          version: 'v2.9'
        });
        FB.AppEvents.logPageView();
      };

      (function (d, s, id) {
        var js,
            fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=' + clientId;
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');
    }
  }, {
    key: 'logout',
    value: function logout() {
      FB.logout();
    }
  }, {
    key: 'getStatus',
    value: function getStatus() {
      var _this3 = this;

      FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
          _this3._accessToken = response.authResponse.accessToken;

          FB.api('/me', { fields: _this3._config.Facebook.fields }, function (fields) {
            return _this3.onAuthenticated(_extends({}, fields, { picture: fields.picture.data.url }));
          });
        } else {
          _this3._accessToken = null;
          _this3.onNotAuthenticated();
        }
      });
    }
  }, {
    key: 'loginDescriptor',
    get: function get() {
      return this._accessToken && { 'graph.facebook.com': this._accessToken };
    }
  }, {
    key: 'ux',
    get: function get() {
      var _this4 = this;

      this._initSDK();
      return function (props) {
        _this4.props = _extends({}, props);
        return _react2.default.createElement(FacebookLoginButton, _this4._config.Facebook.buttonOptions);
      };
    }
  }]);

  return FacebookLogin;
}(_idProvider2.default);

module.exports = new FacebookLogin();