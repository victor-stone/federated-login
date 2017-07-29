'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* global AWS */

var IdProvider = function () {
  function IdProvider(_ref) {
    var name = _ref.name;

    _classCallCheck(this, IdProvider);

    this._fields = {};
    this._name = name;
  }

  _createClass(IdProvider, [{
    key: 'ux',
    value: function ux(props) {
      // eslint-disable-line no-unused-vars
      throw 'derived class of IdProvider must implement ux';
    }
  }, {
    key: 'logout',
    value: function logout() {}
  }, {
    key: 'onAuthenticated',
    value: function onAuthenticated(fields) {
      var _this = this;

      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: this._config.IDENTITY_POOL_ID,
        Logins: this.loginDescriptor
      });

      var _props = this.props,
          authenticated = _props.authenticated,
          error = _props.error;

      /*
          Lot of moving parts behind the scenes:
           These are AWS APIs served from AWS-SDK (which is 
          not the same as individual SDKs)
             - CognitoIdentityCredentials ('Credentials' object)
             - CognitoIdentity ('Service')
                getId()
                getCredentialsForIdentity()
                
            - CognitoIdentityServiceProvider ('Service')
            - STS ('Service')
        */

      AWS.config.credentials.get(function (err) {
        if (err) {
          error && error(err);
        } else {
          _this._fields = fields;
          AWS.config.credentials.identityId && authenticated(_this);
        }
      });
    }
  }, {
    key: 'onNotAuthenticated',
    value: function onNotAuthenticated() {
      var notAuthenticated = this.props.notAuthenticated;


      notAuthenticated && notAuthenticated();
    }
  }, {
    key: 'loginDescriptor',
    get: function get() {
      throw 'derived class of IdProvider must implement loginDescriptor';
    }
  }, {
    key: 'name',
    get: function get() {
      return this._name;
    }
  }, {
    key: 'profile',
    get: function get() {
      return this._fields;
    }
  }, {
    key: 'credentials',
    get: function get() {
      var _AWS$config$credentia = AWS.config.credentials,
          accessKeyId = _AWS$config$credentia.accessKeyId,
          secretAccessKey = _AWS$config$credentia.secretAccessKey,
          sessionToken = _AWS$config$credentia.sessionToken,
          identityId = _AWS$config$credentia.identityId;


      return {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
        sessionToken: sessionToken,
        identityId: identityId
      };
    }
  }, {
    key: 'config',
    set: function set(_ref2) {
      var REGION = _ref2.REGION,
          IDENTITY_POOL_ID = _ref2.IDENTITY_POOL_ID,
          otherstuff = _objectWithoutProperties(_ref2, ['REGION', 'IDENTITY_POOL_ID']);

      this._config = _extends({ REGION: REGION, IDENTITY_POOL_ID: IDENTITY_POOL_ID }, otherstuff);
    }
  }]);

  return IdProvider;
}();

module.exports = IdProvider;