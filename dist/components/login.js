'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactModal = require('react-modal');

var _auth = require('../store/actions/auth');

var _modal = require('../store/actions/modal');

var _profile = require('../store/actions/profile');

var _modal2 = require('./modal');

var _modal3 = _interopRequireDefault(_modal2);

var _providers = require('../auth/providers');

var _providers2 = _interopRequireDefault(_providers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = _react2.default.Component;

/*
    Quick and dirty Alert box
*/

var Alert = function Alert(_ref) {
  var error = _ref.error;
  return _react2.default.createElement(
    'div',
    { className: 'alert alert-danger' },
    _react2.default.createElement(
      'strong',
      null,
      'Wups! '
    ),
    error.toString()
  );
};

/*
    <a /> tag to be used anywhere in the site (esp Navbar)
*/

var _Login = function (_Component) {
  _inherits(_Login, _Component);

  function _Login() {
    _classCallCheck(this, _Login);

    var _this = _possibleConstructorReturn(this, (_Login.__proto__ || Object.getPrototypeOf(_Login)).apply(this, arguments));

    ['login', 'logout'].forEach(function (n) {
      return _this[n] = _this[n].bind(_this);
    });
    return _this;
  }

  _createClass(_Login, [{
    key: 'logout',
    value: function logout(e) {
      e.preventDefault();
      this.props.clearCredentails();
    }
  }, {
    key: 'login',
    value: function login(e) {
      e.preventDefault();
      this.props.openModal('login');
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          isLoggedIn = _props.isLoggedIn,
          picture = _props.picture;


      return isLoggedIn ? _react2.default.createElement(
        'a',
        { href: '#', onClick: this.logout },
        'Logout',
        picture && _react2.default.createElement('img', { className: 'profile-pic', src: picture })
      ) : _react2.default.createElement(
        'a',
        { href: '#', onClick: this.login },
        ' ',
        'Log in'
      );
    }
  }]);

  return _Login;
}(Component);

var mapStateToProps = function mapStateToProps(s) {
  return { isLoggedIn: s.auth.authenticated, picture: s.profile && s.profile.picture };
};

var mapDispatchToProps = { clearCredentails: _auth.clearCredentails,
  openModal: _modal.openModal
};

var Login = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Login);

var Popup = function (_Component2) {
  _inherits(Popup, _Component2);

  function Popup() {
    _classCallCheck(this, Popup);

    var _this2 = _possibleConstructorReturn(this, (Popup.__proto__ || Object.getPrototypeOf(Popup)).apply(this, arguments));

    ['login', 'error'].forEach(function (n) {
      return _this2[n] = _this2[n].bind(_this2);
    });
    _this2.state = { error: null };
    return _this2;
  }

  _createClass(Popup, [{
    key: 'error',
    value: function error(_error) {
      this.setState({ error: _error });
    }
  }, {
    key: 'login',
    value: function login(provider) {
      var _props2 = this.props,
          setCredentails = _props2.setCredentails,
          setProvider = _props2.setProvider,
          setProfile = _props2.setProfile;


      setProfile(provider.profile);
      setCredentails(provider.credentials);
      setProvider(provider.name);

      this.props.closeModal();
    }
  }, {
    key: 'render',
    value: function render() {
      var error = this.state.error;


      var providerProps = {
        error: this.error,
        authenticated: this.login,
        notAuthenticated: this.logout
      };

      return _react2.default.createElement(
        _modal3.default,
        { name: 'login', contentLabel: 'Login' },
        error && _react2.default.createElement(Alert, { error: error }),
        _react2.default.createElement(
          'ul',
          { className: 'list-group' },
          [].concat(_toConsumableArray(_providers2.default)).map(function (p, i) {
            return _react2.default.createElement(
              'ul',
              { className: 'list-group-item', key: i },
              p.ux(providerProps)
            );
          })
        )
      );
    }
  }]);

  return Popup;
}(Component);

var mapStateToProps2 = function mapStateToProps2(s) {
  return { isLoggedIn: s.auth.authenticated };
};

var mapDispatchToProps2 = { setCredentails: _auth.setCredentails,
  clearCredentails: _auth.clearCredentails,
  setProvider: _auth.setProvider,
  setProfile: _profile.setProfile,
  closeModal: _modal.closeModal
};

Login.Popup = (0, _reactRedux.connect)(mapStateToProps2, mapDispatchToProps2)(Popup);

Login.Popup.defaultStyles = _reactModal.defaultStyles;

module.exports = Login;